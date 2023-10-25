import { GroupField, Content } from "@prismicio/client";
import Quote, { QuoteProps } from "./quotes/quote";
import Slider from "@/components/shared/Slider";

export default function Quotes({ playbooks, gem }: { playbooks: GroupField; gem: string }) {
  const quotes: QuoteProps[] = [];

  // Loop playbooks that include gem
  for (let i = 0; i < playbooks.length; i++) {
    const slices = (playbooks[i].playbook as unknown as Content.PlaybookDocument).data.slices;

    // Loop playbook gems/slices
    for (let ii = 0; ii < slices.length; ii++) {
      const primary = slices[ii].primary;

      // Gem match
      if ((primary.gem as unknown as Content.GemDocument).uid === gem) {
        const gemCreator = primary.creator as unknown as Content.CreatorDocument;
        const playbookCreator = (playbooks[i].playbook as unknown as Content.PlaybookDocument).data
          .creator as unknown as Content.CreatorDocument;

        // Add to array
        quotes.push({
          uid: gemCreator.data ? gemCreator.uid : playbookCreator.uid,
          firstName: gemCreator.data
            ? (gemCreator.data.first_name as string)
            : (playbookCreator.data.first_name as string),
          lastName: gemCreator.data
            ? (gemCreator.data.last_name as string)
            : (playbookCreator.data.last_name as string),
          image: gemCreator.data ? gemCreator.data.profile_image : playbookCreator.data.profile_image,
          text: primary.description,
        });
      }
    }
  }

  return (
    <section className="!pl-0 !pr-0">
      <Slider minItems={3}>
        {quotes.map((item, i) => (
          <Quote
            key={i}
            uid={item.uid}
            firstName={item.firstName}
            lastName={item.lastName}
            image={item.image}
            text={item.text}
          />
        ))}
      </Slider>
    </section>
  );
}
