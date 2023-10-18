import Category from "./categories/Category";

export default function Categories() {
  return (
    <div className="md:mb-6">
      <Category name="Accommodation" />
      <Category name="Culture" />
      <Category name="Events" />
      <Category name="Food & Drink" />
      <Category name="Nature" />
      <Category name="Neighbourhoods" />
      <Category name="Retail" />
      <Category name="Wellness" />
    </div>
  );
}
