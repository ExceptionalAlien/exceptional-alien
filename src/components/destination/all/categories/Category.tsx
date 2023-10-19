import GemIcon from "@/components/shared/GemIcon";

export default function Category({
  name,
  categories,
  categoryClick,
}: {
  name: string;
  categories: string[];
  categoryClick: (category: string) => void;
}) {
  return (
    <button
      onClick={() => categoryClick(name)}
      className={`group/link text-sm md:text-base text-ex-blue hover:bg-ex-blue hover:text-white duration-300 ease-in-out transition-[background-color,color] rounded-full p-1 md:p-2 pl-2 md:pl-4 pr-2 md:pr-4 border-[1.5px] border-ex-blue inline-flex items-center justify-center mt-2 mr-2 ${
        categories.includes(name) && "bg-ex-blue text-white [&>div>svg]:fill-white"
      }`}
    >
      <GemIcon
        category={name}
        hideBg={true}
        classes="group-hover/link:[&>svg]:fill-white relative overflow-hidden !w-4 md:!w-5 h-4 md:h-5 !m-0 !mr-1 [&>svg]:-top-[10px] [&>svg]:md:-top-[12px] [&>svg]:-left-[10px] [&>svg]:md:-left-[12px] [&>svg]:!w-9 [&>svg]:md:!w-11"
      />
      {name}
    </button>
  );
}
