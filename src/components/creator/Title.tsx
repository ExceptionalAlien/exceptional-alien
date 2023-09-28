import MachineCode from "../MachineCode";

export default function Title({
  firstName,
  lastName,
  country,
}: {
  firstName: string;
  lastName: string;
  country: string;
}) {
  return (
    <section className="mb-8 md:mb-16">
      <h2 className="md:float-left md:w-1/2 font-bold text-3xl md:text-6xl">
        {firstName} {lastName?.toUpperCase()}
      </h2>

      <MachineCode
        firstName={firstName}
        lastName={lastName}
        country={country}
        classes="md:float-right md:w-1/2 md:text-right"
      />

      <div className="clear-both"></div>
    </section>
  );
}
