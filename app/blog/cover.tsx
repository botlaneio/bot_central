export default function Cover({ slug, className }: { slug: string; className?: string }) {
  return <img
    src={`/images/insights/${slug}.webp`}
    alt=""
    className={className}
    decoding="async"
  />;
}
