import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface CarruselVideosProps {
  videos: string[];
}

const esVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

const CarruselVideos = ({ videos }: CarruselVideosProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [indiceActual, setIndiceActual] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const irAlSiguiente = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndiceActual(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === indiceActual) {
        try {
          video.currentTime = 0;
          const p = video.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } catch {
          // ignore
        }
      } else {
        video.pause();
        try {
          video.currentTime = 0;
        } catch {
        }
      }
    });

    const srcActual = videos[indiceActual];
    if (srcActual && !esVideo(srcActual)) {
      timeoutRef.current = setTimeout(irAlSiguiente, 4000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [indiceActual, videos, irAlSiguiente]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {videos.map((src, i) => (
            <div key={i} className="relative min-w-0 flex-[0_0_100%] bg-card">
              {esVideo(src) ? (
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={src}
                  muted
                  playsInline
                  preload="auto"
                  onEnded={irAlSiguiente}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <img src={src} alt={`Slide ${i + 1}`} className="h-40 w-full object-cover" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              indiceActual === i ? "w-6 bg-cyan" : "w-2.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarruselVideos;
