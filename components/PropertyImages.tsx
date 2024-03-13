import Image from "next/image";
import { clsx } from "clsx";
import { Property } from "@/types";

type PropertyImagesProps = {
  images: Property["images"];
};

export default function PropertyImages({ images }: PropertyImagesProps) {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images?.length === 1 ? (
          <Image
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
                <Image
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
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
