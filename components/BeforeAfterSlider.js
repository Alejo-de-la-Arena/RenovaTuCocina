'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  alt = 'Comparación antes y después',
  projectTitle,
  projectLocation,
  projectType,
  thumbnails = [],
  dark = false,
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleMove = (e) => updatePosition(e.clientX);
  const handleTouchMove = (e) => {
    e.preventDefault();
    updatePosition(e.touches[0].clientX);
  };
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const currentBefore = thumbnails.length ? thumbnails[activeIndex]?.before ?? beforeImage : beforeImage;
  const currentAfter = thumbnails.length ? thumbnails[activeIndex]?.after ?? afterImage : afterImage;
  const currentTitle = thumbnails.length ? thumbnails[activeIndex]?.title : projectTitle;
  const currentLocation = thumbnails.length ? thumbnails[activeIndex]?.ubicacion : projectLocation;

  return (
    <div className="space-y-6">
      <div
        ref={containerRef}
        className={cn(
          'relative w-full aspect-[16/10] rounded-2xl overflow-hidden select-none border border-neutral-border/80 shadow-medium',
          isDragging && 'cursor-col-resize'
        )}
        onMouseMove={isDragging ? handleMove : undefined}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        role="img"
        aria-label={alt}
      >
        {/* Imagen después (base) */}
        <div className="absolute inset-0">
          <Image
            src={currentAfter}
            alt={`${alt} - después`}
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
        </div>

        {/* Imagen antes (con clip) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={currentBefore}
            alt={`${alt} - antes`}
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
        </div>

        {/* Handle premium */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg border border-neutral-border/50"
          style={{
            left: `${sliderPosition}%`,
            transform: 'translateX(-50%)',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-medium flex items-center justify-center border border-neutral-border/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-text"
            >
              <path d="M15 18l-6-6 6-6" />
              <path d="M9 18l-6-6 6-6" />
            </svg>
          </motion.div>
        </div>

        {/* Chips Antes / Después */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1.5 bg-black/70 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
            Antes
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <span className="px-3 py-1.5 bg-black/70 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
            Después
          </span>
        </div>
      </div>

      {/* Thumbnails para cambiar de proyecto */}
      {thumbnails.length > 1 && (
        <div className="space-y-2">
          <p className={cn('w-full text-center text-xs font-medium uppercase tracking-wider', dark ? 'text-dark-muted' : 'text-neutral-muted')}>
            Otros proyectos
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
          {thumbnails.map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setActiveIndex(i);
                setSliderPosition(50);
              }}
              className={cn(
                'relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 focus-ring',
                activeIndex === i
                  ? 'border-primary ring-2 ring-primary/30'
                  : 'border-neutral-border hover:border-primary/50'
              )}
            >
              <Image
                src={t.after}
                alt={t.title}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}
