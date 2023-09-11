import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Gem`.
 */
export type GemProps = SliceComponentProps<Content.GemSlice>;

/**
 * Component for "Gem" Slices.
 */
const Gem = ({ slice }: GemProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for gem (variation: {slice.variation}) Slices
    </section>
  );
};

export default Gem;
