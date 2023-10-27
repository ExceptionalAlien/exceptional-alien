import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props for `SingleHeading`.
 */
export type SingleHeadingProps = SliceComponentProps<Content.SingleHeadingSlice>;

/**
 * Component for "SingleHeading" Slices.
 */
const SingleHeading = ({ slice }: SingleHeadingProps): JSX.Element => {
  return (
    <section
      className="text-2xl font-bold md:text-3xl"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.heading} />
    </section>
  );
};

export default SingleHeading;
