import { KeyTextField } from "@prismicio/client";

const machineCode = (first: string, last: string, country: string) => {
  const max = 40;
  var code = `EA<${country ? country : "WWW"}${last ? last.replace(/ /g, "") : ""}<<${first
    .replace(/ /g, "")
    .replace(/&/g, "<")}`;

  // Add extra arrows
  const loop = max - code.length;

  for (let i = 0; i < loop; i++) {
    code += "<";
  }

  return code.substring(0, max); // Trim if more than max
};

export default function Title(props: { firstName: KeyTextField; lastName: KeyTextField; country: KeyTextField }) {
  return (
    <section>
      <h2 className="md:float-left md:w-1/2 font-bold text-4xl md:text-6xl">
        {props.firstName} {props.lastName?.toUpperCase()}
      </h2>

      <p className="md:float-right md:w-1/2 md:text-right font-mono text-xs md:text-sm uppercase">
        {machineCode(props.firstName as string, props.lastName as string, props.country as string)}
      </p>

      <div className="clear-both"></div>
    </section>
  );
}
