import Image from "next/image";
import Link from "next/link";

export default function Title({ data }: { data: any }) {
  return (
    <div className="absolute h-[72px] md:h-20 bottom-0 font-bold text-white drop-shadow flex justify-between items-center w-full">
      <h2 className="w-3/5 !leading-tight pl-3 md:pl-4 text-xl md:text-2xl">{data.title.substring(0, 50)}</h2>

      {/* Creator */}
      <Link
        href={"/creators/" + data.creator.uid}
        className="flex items-center pr-3 md:pr-4 hover:opacity-50 duration-300 ease-in-out transition-opacity"
      >
        <p className="text-sm font-bold whitespace-nowrap max-[320px]:!hidden landscape:!hidden md:landscape:!inline-block">
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
