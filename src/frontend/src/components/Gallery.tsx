import { useGetGallery } from "../hooks/useQueries";

export default function Gallery() {
  const { data: gallery = [] } = useGetGallery();

  return (
    <section id="gallery" className="container py-16 md:py-24">
      <div className="mb-12 max-w-2xl">
        <h2 className="font-serif text-4xl font-medium tracking-tight">
          Inside the studio
        </h2>
        <p className="mt-4 text-lg text-cocoa">
          A look at the chairs, the color bar, and the work that leaves them.
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {gallery.map((image) => (
          <li
            key={image.id.toString()}
            className="group relative overflow-hidden rounded-2xl"
          >
            <img
              src={image.url}
              alt={image.caption}
              loading="lazy"
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/70 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-cream">
              {image.caption}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
