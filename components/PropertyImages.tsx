import Image from "next/image";
import { clsx } from "clsx";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Property } from "@/types";

type PropertyImagesProps = {
  images: Property["images"];
};

export default function PropertyImages({ images }: PropertyImagesProps) {
  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images?.length === 1 ? (
            <Item
              original={
                images[0]?.startsWith("http")
                  ? images[0]
                  : `/images/properties/${images[0]}`
              }
              thumbnail={
                images[0]?.startsWith("http")
                  ? images[0]
                  : `/images/properties/${images[0]}`
              }
              width="1000"
              height="600"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={
                    // @ts-ignore
                    images[0]?.startsWith("http")
                      ? // @ts-ignore
                        images[0]
                      : // @ts-ignore
                        `/images/properties/${image[0]}`
                  }
                  alt=""
                  className="object-cover h-[400px] mx-auto rounded-xl"
                  width={1800}
                  height={400}
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images?.map((image, index) => (
                <div
                  key={index}
                  className={clsx({
                    "col-span-1": !(images.length === 3 && index === 2),
                    "col-span-2": images.length === 3 && index === 2,
                  })}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width="1000"
                    height="600"
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        key={index}
                        src={
                          image?.startsWith("http")
                            ? image
                            : `/images/properties/${image}`
                        }
                        alt="object-cover h-[400px] w-full rounded-xl"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
}
