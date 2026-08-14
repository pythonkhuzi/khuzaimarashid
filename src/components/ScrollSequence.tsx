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
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [imagesLoaded]);

  useEffect(() => {
    let animationFrameId: number;

    const renderFrame = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;
      if (imagesRef.current.length === 0) return;

      const scrollTop = document.documentElement.scrollTop;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;

      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(scrollFraction * FRAME_COUNT)
      );

      let targetImg = imagesRef.current[frameIndex];

      // If the exact frame isn't loaded yet, find the closest loaded frame to keep animation alive
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

      // Draw the best available frame
      if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = targetImg.width / targetImg.height;
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
      }
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame();
      }
    };

    const handleScroll = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(renderFrame);
    };

    // Initialize canvas size
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Fetch images concurrently instead of awaiting sequentially
    const preloadArray: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(4, '0');
      
      img.onload = () => {
        setImagesLoaded(prev => {
          const newCount = prev + 1;
          // Force a frame render when images load (important for initial render)
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(renderFrame);
          return newCount;
        });
      };
      
      img.onerror = () => {
        setImagesLoaded(prev => prev + 1);
      };
      
      img.src = `/frames/frame-${frameNumber}.jpg`;
      preloadArray.push(img);
    }
    
    imagesRef.current = preloadArray;

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
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
