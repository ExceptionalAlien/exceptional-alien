import Field from "./search-box/Field";
import Suggestions from "./search-box/Suggestions";

export default function SearchBox({
  fixed,
  suggestions,
  classes,
}: {
  fixed?: boolean;
  suggestions?: boolean;
  classes?: string;
}) {
  return (
    <div
      className={`max-w-sm md:max-w-none m-auto flex flex-col justify-center items-center top-12 md:top-20 ${
        fixed ? "fixed h-0 overflow-hidden" : "h-72 md:h-80"
      } ${classes}`}
    >
      <Field />
      {suggestions && <Suggestions />}
    </div>
  );
}
