import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 144;

export const ScrollSequence = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

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

      const img = imagesRef.current[frameIndex];
      // Only draw if image is fully loaded, otherwise keep the previous frame
      if (img && img.complete && img.naturalWidth > 0) {
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
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
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
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
    <div className="fixed inset-0 z-[-2] pointer-events-none bg-slate-950">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-100 object-cover"
        style={{ 
          transition: 'opacity 0.5s ease'
        }}
      />
      {/* Loading overlay for smooth transition */}
      {imagesLoaded < 10 && (
        <div className="absolute inset-0 bg-slate-950 flex items-center justify-center transition-opacity duration-1000">
          <div className="text-brand-blue/50 text-sm animate-pulse">
            Loading visual experience... {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/80" />
    </div>
  );
};
