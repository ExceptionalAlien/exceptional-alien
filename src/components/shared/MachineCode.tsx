const code = (first: string, last: string, country: string) => {
  const max = 40;

  var code = `EA<${country ? country : "WWW"}${last ? last.replace(/ /g, "").replace(/'/g, "") : ""}<<${first
    .replace(/ /g, "")
    .replace(/'/g, "")
    .replace(/&/g, "<")}`;

  const loop = max - code.length;

  // Add extra arrows
  for (let i = 0; i < loop; i++) {
    code += "<";
  }

  return code.substring(0, max); // Trim if more than max
};

type MachineCodeProps = {
  firstName: string;
  lastName: string;
  country: string;
  classes?: string;
};

export default function MachineCode(props: MachineCodeProps) {
  return (
    <p className={`font-mono text-xs uppercase md:text-sm ${props.classes}`}>
      {code(props.firstName, props.lastName, props.country)}
    </p>
  );
}
