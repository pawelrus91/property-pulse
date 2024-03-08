import { Property } from "@/types";
import Image from "next/image";

type PropertyHeaderImageProps = {
  image: NonNullable<Property["images"]>[0] | undefined;
};

export default function PropertyHeaderImage({
  image,
}: PropertyHeaderImageProps) {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={
              // @ts-ignore
              image?.startsWith("http")
                ? // @ts-ignore
                  (image as string)
                : // @ts-ignore
                  `/images/properties/${image}`
            }
            alt=""
            className="object-cover h-[400px] w-full"
            width="0"
            height="0"
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}
