import Field from "./search-box/Field";
import Suggestions from "./search-box/Suggestions";

export default function SearchBox({ fixed, classes }: { fixed?: boolean; classes?: string }) {
  return (
    <div
      className={`flex flex-col justify-center items-center top-12 md:top-20 overflow-hidden ${
        fixed ? "fixed h-0" : "h-80 md:h-96"
      } ${classes}`}
    >
      <Field />
      <Suggestions />
    </div>
  );
}
