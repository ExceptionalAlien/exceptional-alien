import Image from "next/image";
import Link from "next/link";

export default function Creator({ data }: { data: any }) {
  return (
    <Link
      href={"/creators/" + data.uid}
      className="flex items-center p-3 md:p-4 hover:opacity-75 duration-300 ease-in-out transition-opacity"
    >
      <p className="text-sm whitespace-nowrap max-[320px]:!hidden landscape:!hidden md:landscape:!inline-block">
        {data.data.first_name} {data.data.last_name.toUpperCase()}
      </p>

      <Image
        src={data.data.profile_image.url}
        alt={data.data.profile_image.alt}
        width={48}
        height={48}
        className="rounded-full ml-2 border border-white"
      />
    </Link>
  );
}