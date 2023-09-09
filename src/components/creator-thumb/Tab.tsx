import TabHeading from "@/components/TabHeading";
import MachineCode from "@/components/MachineCode";

interface TabProps {
  title: string;
  size: string;
  homeCity: string;
  currentCity: string;
  firstName: string;
  lastName: string;
  homeCountry: string;
}

export default function Tab(props: TabProps) {
  return (
    <TabHeading
      classes={`mt-1 group-hover/link:text-ex-blue group-hover/link:border-ex-blue duration-300 ease-in-out ${
        props.size !== "mobile" && "!pt-1 !pl-[6px] !h-9"
      }`}
    >
      {/* Job title */}
      <p>{props.title}</p>

      {/* Location */}
      <p className="uppercase">
        {props.homeCity && props.size === "mobile" && `${props.homeCity} ${"\u2794"} `}
        {props.currentCity}
      </p>

      {props.size === "mobile" && (
        <MachineCode
          firstName={props.firstName}
          lastName={props.lastName}
          country={props.homeCountry}
          classes="absolute right-2 top-[6px] !text-xs hidden xl:inline"
        />
      )}
    </TabHeading>
  );
}
