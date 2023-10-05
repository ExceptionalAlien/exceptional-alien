import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Playbook`.
 */
export type PlaybookProps = SliceComponentProps<Content.PlaybookSlice>;

/**
 * Component for "Playbook" Slices.
 */
const Playbook = ({ slice }: PlaybookProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for playbook (variation: {slice.variation}) Slices
    </section>
  );
};

export default Playbook;
