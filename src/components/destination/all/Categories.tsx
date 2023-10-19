import Category from "./categories/Category";

export default function Categories({
  categories,
  setCategories,
}: {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const categoryClick = (category: string) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((item) => item !== category)); // Remove
    } else {
      setCategories([...categories, category]); // Add
    }
  };

  return (
    <div className="md:mb-6">
      <Category name="Accommodation" categories={categories} categoryClick={categoryClick} />
      <Category name="Culture" categories={categories} categoryClick={categoryClick} />
      <Category name="Events" categories={categories} categoryClick={categoryClick} />
      <Category name="Food & Drink" categories={categories} categoryClick={categoryClick} />
      <Category name="Nature" categories={categories} categoryClick={categoryClick} />
      <Category name="Neighbourhoods" categories={categories} categoryClick={categoryClick} />
      <Category name="Retail" categories={categories} categoryClick={categoryClick} />
      <Category name="Wellness" categories={categories} categoryClick={categoryClick} />
    </div>
  );
}
