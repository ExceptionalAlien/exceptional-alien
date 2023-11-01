interface NoResultsProps {
  visible: boolean;
  classes?: string;
}

export default function NoResults(props: NoResultsProps) {
  return (
    <p className={`p-4 text-center text-ex-grey md:p-6 ${!props.visible && "hidden"} ${props.classes}`}>
      No results found
    </p>
  );
}
