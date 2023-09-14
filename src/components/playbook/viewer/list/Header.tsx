import Image from "next/image";
import Link from "next/link";
import { shimmer, toBase64 } from "@/utils/shimmer";

export default function Header({ data }: { data: any }) {
  return (
    <div className={`text-white relative bg-black`}>
      <Image
        src={data.image.url}
        alt={data.image.alt}
        width={data.image.dimensions.width}
        height={data.image.dimensions.height}
        placeholder={`data:image/svg+xml;base64,${toBase64(
          shimmer(data.image.dimensions.width, data.image.dimensions.height)
        )}`}
        className="w-full opacity-90"
      />

      <h2 className="w-3/5 !leading-snug md:!leading-tight drop-shadow absolute pl-3 md:pl-4 pb-2 md:pb-3 bottom-0 font-bold text-xl md:text-2xl">
        {data.title.substring(0, 50)}
      </h2>

      {/* Creator */}
      <Link
        href={"/creators/" + data.creator.uid}
        className="[&>*]:inline-block drop-shadow p-3 md:p-4 absolute bottom-0 right-0 hover:opacity-50 duration-300 ease-in-out transition-opacity"
      >
        <p className="text-sm font-bold max-[320px]:!hidden landscape:!hidden md:landscape:!inline-block">
          {data.creator.data.first_name} {data.creator.data.last_name.toUpperCase()}
        </p>

        <Image
          src={data.creator.data.profile_image.url}
          alt={data.creator.data.profile_image.alt}
          width={48}
          height={48}
          className="rounded-full ml-2 border-2 border-white"
        />
      </Link>
    </div>
  );
}
