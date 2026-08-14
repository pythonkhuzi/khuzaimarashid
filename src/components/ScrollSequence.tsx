import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 144;

export const ScrollSequence = () => {
  const imgRef = useRef<HTMLImageElement>(null);
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

    // Bulletproof Game-loop style rendering engine
    const renderLoop = () => {
      // 1. Get accurate scroll position across all possible scrollable elements
      const scrollTop = Math.max(
        window.scrollY || 0,
        window.pageYOffset || 0,
        document.documentElement.scrollTop || 0,
        document.body.scrollTop || 0
      );

      // 2. Get accurate maximum scroll height
      const scrollHeight = Math.max(
        document.body.scrollHeight || 0,
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0,
        document.documentElement.offsetHeight || 0,
        document.documentElement.clientHeight || 0
      );

      const maxScrollTop = scrollHeight - window.innerHeight;
      const scrollFraction = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;

      // 3. Calculate target frame
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(scrollFraction * FRAME_COUNT))
      );

      // 4. Fast direct DOM update (bypass React state for 60fps performance)
      if (frameIndex !== currentFrameIndex && imgRef.current) {
        let targetImg = imagesRef.current[frameIndex];

        // Find fallback if current isn't ready
        if (!targetImg || !targetImg.complete) {
          let searchRadius = 1;
          while (searchRadius < FRAME_COUNT) {
            const up = frameIndex + searchRadius;
            const down = frameIndex - searchRadius;
            if (up < FRAME_COUNT && imagesRef.current[up]?.complete) {
              targetImg = imagesRef.current[up];
              break;
            }
            if (down >= 0 && imagesRef.current[down]?.complete) {
              targetImg = imagesRef.current[down];
              break;
            }
            searchRadius++;
          }
        }

        if (targetImg && targetImg.complete) {
          // Direct SRC update is extremely fast and bulletproof for object-cover
          imgRef.current.src = targetImg.src;
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
        {/* Replaced canvas with a standard img tag. The browser natively handles object-cover flawlessly */}
        <img
          ref={imgRef}
          className="w-full h-full object-cover opacity-100"
          alt="Scroll Animation Background"
          src="/frames/frame-0001.jpg" // Default starting frame
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
