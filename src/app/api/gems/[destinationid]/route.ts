import { createClient } from "@/prismicio";
import { filter } from "@prismicio/client";

export async function GET(request: Request, { params }: { params: { destinationid: string } }) {
  const client = createClient();

  const gems = await client.getAllByType("gem", {
    fetchOptions: {
      cache: "no-store",
    },
    fetch: "gem.title,gem.category,gem.playbooks,gem.location,gem.description,gem.address,gem.image",
    filters: [filter.at("my.gem.destination", params.destinationid)],
    fetchLinks:
      "playbook.sub_title,playbook.creator,playbook.slices,playbook.locked,playbook.image,creator.profile_image,creator.first_name,creator.last_name,creator.title",
  });

  return Response.json(gems);
}
