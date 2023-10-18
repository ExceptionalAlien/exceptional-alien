import GemIcon from "@/components/shared/GemIcon";

export default function Category({ name }: { name: string }) {
  return (
    <button className="group/link text-sm md:text-base text-ex-blue hover:bg-ex-blue hover:text-white duration-300 ease-in-out transition-[background-color,color] rounded-full p-1 md:p-2 pl-2 md:pl-4 pr-2 md:pr-4 border-[1.5px] border-ex-blue inline-flex items-center justify-center mt-2 mr-2 [&>div]:relative [&>div]:oveflow-hidden [&>div]:!w-4 [&>div]:md:!w-5 [&>div]:h-4 [&>div]:md:h-5 [&>div]:!m-0 [&>div]:!mr-1 [&>div>svg]:-top-[10px] [&>div>svg]:md:-top-[12px] [&>div>svg]:-left-[10px] [&>div>svg]:md:-left-[12px] [&>div>svg]:!w-9 [&>div>svg]:md:!w-11">
      <GemIcon category={name} hideBg={true} classes="group-hover/link:[&>svg]:fill-white" />
      {name}
    </button>
  );
}
