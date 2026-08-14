import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 144;

export const ScrollSequence = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Lock scroll while the initial essential frames load
  useEffect(() => {
    if (imagesLoaded < 15) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [imagesLoaded]);

  useEffect(() => {
    let animationFrameId: number;
    let currentFrameIndex = -1;

    // Fetch images concurrently
    const preloadArray: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(4, '0');
      
      img.onload = () => {
        setImagesLoaded(prev => prev + 1);
      };
      
      img.onerror = () => {
        setImagesLoaded(prev => prev + 1);
      };
      
      img.src = `/frames/frame-${frameNumber}.jpg`;
      preloadArray.push(img);
    }
    
    imagesRef.current = preloadArray;

    // Game-loop style rendering engine (100% robust against dropped scroll events)
    const renderLoop = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animationFrameId = requestAnimationFrame(renderLoop);
        return;
      }
      
      const context = canvas.getContext('2d');
      if (!context || imagesRef.current.length === 0) {
        animationFrameId = requestAnimationFrame(renderLoop);
        return;
      }

      // Sync canvas dimensions
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        currentFrameIndex = -1; // Force redraw on resize
      }

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.documentElement.clientHeight
      );
      const maxScrollTop = scrollHeight - window.innerHeight;
      const scrollFraction = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;

      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(scrollFraction * FRAME_COUNT)
      );

      // Only draw if frame changed or forced
      if (frameIndex !== currentFrameIndex) {
        let targetImg = imagesRef.current[frameIndex];

        // Find fallback if current isn't ready
        if (!targetImg || !targetImg.complete || targetImg.naturalWidth === 0) {
          let searchRadius = 1;
          while (searchRadius < FRAME_COUNT) {
            const up = frameIndex + searchRadius;
            const down = frameIndex - searchRadius;
            if (up < FRAME_COUNT && imagesRef.current[up]?.complete && imagesRef.current[up]?.naturalWidth > 0) {
              targetImg = imagesRef.current[up];
              break;
            }
            if (down >= 0 && imagesRef.current[down]?.complete && imagesRef.current[down]?.naturalWidth > 0) {
              targetImg = imagesRef.current[down];
              break;
            }
            searchRadius++;
          }
        }

        if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
          const imgW = targetImg.naturalWidth || targetImg.width;
          const imgH = targetImg.naturalHeight || targetImg.height;
          
          const canvasRatio = canvas.width / canvas.height;
          const imgRatio = imgW / imgH;
          let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

          if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetY = (canvas.height - drawHeight) / 2;
          } else {
            drawHeight = canvas.height;
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
          }

          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(targetImg, offsetX, offsetY, drawWidth, drawHeight);
          currentFrameIndex = frameIndex;
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Start render loop
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none bg-slate-950">
        <canvas
          ref={canvasRef}
          className="w-full h-full opacity-100 object-cover"
          style={{ 
            transition: 'opacity 0.5s ease'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/80" />
      </div>
      
      {/* Global Loading overlay to prevent premature scrolling */}
      {imagesLoaded < 15 && (
        <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center transition-opacity duration-1000">
          <div className="text-brand-blue animate-pulse mb-6 text-xl md:text-2xl tracking-[0.3em] font-light uppercase">
            Loading Experience
          </div>
          <div className="w-64 max-w-[80vw] h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-blue transition-all duration-300 ease-out"
              style={{ width: `${Math.min(100, (imagesLoaded / 15) * 100)}%` }}
            />
          </div>
          <div className="text-slate-500 text-xs mt-6 uppercase tracking-[0.2em]">
            Optimizing visual assets... {Math.round((Math.min(imagesLoaded, 15) / 15) * 100)}%
          </div>
        </div>
      )}
    </>
  );
};
