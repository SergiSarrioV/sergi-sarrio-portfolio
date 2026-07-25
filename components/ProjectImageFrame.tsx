import { ImageIcon } from "lucide-react";
import type { ProjectImage } from "@/data/portfolio";
import { ProjectMockup } from "@/components/ProjectMockup";

/**
 * Renders a project visual inside a framed figure, preferring a real
 * screenshot and falling back to the project's vector mockup. Both share the
 * frame's 16/10 ratio, so nothing shifts while the page loads. Uses a plain
 * <img> so it works on any host without image-optimization config.
 */
export function ProjectImageFrame({
  image,
  className = "",
  priority = false,
}: {
  image: ProjectImage;
  className?: string;
  priority?: boolean;
}) {
  const hasSrc = image.src.trim().length > 0;

  return (
    <figure className={className}>
      <div className="glass relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-ink-700 shadow-[0_30px_80px_-40px_rgba(124,92,255,0.6)]">
        {hasSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.src}
            alt={image.alt}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-contain"
          />
        ) : image.mockup ? (
          <ProjectMockup kind={image.mockup} label={image.alt} />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-accent-violet/15 via-ink-800 to-accent-cyan/15">
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="relative flex flex-col items-center gap-3 px-6 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-ink-600 bg-ink-900/60 text-accent-violet">
                <ImageIcon className="h-5 w-5" />
              </span>
              <p className="font-mono text-sm text-gray-300">{image.alt}</p>
            </div>
          </div>
        )}
      </div>
      {image.caption && (
        <figcaption className="mt-3 text-center text-sm text-gray-500">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
