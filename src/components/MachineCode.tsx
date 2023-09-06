const code = (first: string, last: string, country: string) => {
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

export default function MachineCode(props: { firstName: string; lastName: string; country: string; classes?: string }) {
  return (
    <p className={`font-mono text-xs md:text-sm uppercase ${props.classes}`}>
      {code(props.firstName as string, props.lastName as string, props.country as string)}
    </p>
  );
}
