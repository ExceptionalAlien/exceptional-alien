import GemIcon from "@/components/shared/GemIcon";

interface CategoryProps {
  name: string;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Category(props: CategoryProps) {
  const categoryClick = () => {
    const category = props.name.toLowerCase();

    if (props.categories.includes(category)) {
      props.setCategories(props.categories.filter((item) => item !== category)); // Remove
    } else {
      props.setCategories([...props.categories, category]); // Add
    }
  };

  return (
    <button
      onClick={categoryClick}
      className={`group/link mr-2 mt-2 inline-flex h-9 items-center rounded-full border border-ex-blue pl-3 pr-3 text-ex-blue transition-[background-color,color] duration-300 ease-in-out hover:bg-ex-blue hover:text-white ${
        props.categories.includes(props.name.toLowerCase()) && "bg-ex-blue text-white"
      }`}
    >
      <GemIcon
        category={props.name}
        hideBg={true}
        classes={`mr-2 group-hover/link:text-white ${
          props.categories.includes(props.name.toLowerCase()) && "text-white"
        }`}
      />
      {props.name}
    </button>
  );
}
