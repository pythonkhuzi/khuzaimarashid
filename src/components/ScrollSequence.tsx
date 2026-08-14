import { useEffect, useRef, useState, useCallback } from 'react';

const FRAME_COUNT = 144;
// Build the base URL from Vite's resolved base, ensuring no double slashes
const BASE = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');

export const ScrollSequence = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const rafRef = useRef<number | null>(null);
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

  // Draw a frame onto the canvas, handling object-cover scaling
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let targetImg = imagesRef.current[frameIndex];

    // Fallback: find nearest loaded frame if this one isn't ready
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

    if (!targetImg || !targetImg.complete || targetImg.naturalWidth === 0) return;

    // Object-cover logic: scale image to cover the entire canvas
    const imgRatio = targetImg.naturalWidth / targetImg.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas — fit height, crop sides
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    } else {
      // Image is taller than canvas — fit width, crop top/bottom
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(targetImg, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // Core scroll handler — calculates frame index from scroll position
  const handleScroll = useCallback(() => {
    // Cancel any pending frame to avoid stacking
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY;

      // Use the most reliable scroll-height source
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const maxScrollTop = docHeight - window.innerHeight;

      if (maxScrollTop <= 0) return; // Page not yet measured / too short

      const scrollFraction = Math.min(1, Math.max(0, scrollTop / maxScrollTop));
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(scrollFraction * (FRAME_COUNT - 1)))
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }

      rafRef.current = null;
    });
  }, [drawFrame]);

  // Preload all images + set up scroll/resize listeners
  useEffect(() => {
    // --- 1. Preload images ---
    const preloadArray: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(4, '0');

      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        // Re-draw current frame if we just loaded the one we need
        if (i - 1 === currentFrameRef.current || currentFrameRef.current === -1) {
          if (currentFrameRef.current === -1) currentFrameRef.current = 0;
          drawFrame(currentFrameRef.current);
        }
      };

      img.onerror = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };

      // Use the resolved base URL so paths work on both localhost and Vercel
      img.src = `${BASE}/frames/frame-${frameNumber}.jpg`;
      // Prevent CORS issues on some CDNs
      img.crossOrigin = 'anonymous';
      preloadArray.push(img);
    }

    imagesRef.current = preloadArray;

    // --- 2. Size the canvas to match the viewport (using devicePixelRatio for sharpness) ---
    const sizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      // Re-draw the current frame at the new size
      if (currentFrameRef.current >= 0) {
        drawFrame(currentFrameRef.current);
      }
    };

    sizeCanvas();

    // --- 3. Attach listeners ---
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', sizeCanvas);

    // ResizeObserver as a backup for viewport changes (e.g., mobile address bar)
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(sizeCanvas);
      resizeObserver.observe(document.documentElement);
    }

    // MutationObserver: when the DOM settles (content loads, scroll-lock releases),
    // re-fire the scroll handler so the frame index recalculates with the correct
    // document height. This is the key fix for Vercel production where the initial
    // scrollHeight can be wrong during hydration.
    const mutationObserver = new MutationObserver(() => {
      handleScroll();
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style'],
    });

    // Draw the first frame immediately
    const firstImg = preloadArray[0];
    if (firstImg.complete && firstImg.naturalWidth > 0) {
      currentFrameRef.current = 0;
      drawFrame(0);
    } else {
      firstImg.addEventListener('load', () => {
        if (currentFrameRef.current === -1) {
          currentFrameRef.current = 0;
          drawFrame(0);
        }
      }, { once: true });
    }

    // --- 4. Cleanup ---
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', sizeCanvas);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (resizeObserver) resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [drawFrame, handleScroll]);

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none bg-slate-950">
        {/* Canvas rendering avoids the img.src re-decode stutter that breaks on CDN-served images */}
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
          aria-hidden="true"
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
