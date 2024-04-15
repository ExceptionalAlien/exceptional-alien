import { createClient } from "@/prismicio";
import { filter } from "@prismicio/client";

export async function GET(request: Request, { params }: { params: { uid: string } }) {
  const client = createClient();

  const gems = await client.getAllByType("gem", {
    fetchOptions: {
      cache: "no-store",
    },
    fetch: "gem.title,gem.category,gem.playbooks,gem.location,gem.description,gem.address,gem.image,gem.destination",
    filters: [filter.at("my.gem.destination", params.uid)],
    fetchLinks:
      "playbook.sub_title,playbook.creator,playbook.app_title,playbook.destination,playbook.slices,playbook.locked,playbook.image,creator.profile_image,creator.first_name,creator.last_name,creator.title,destination.title",
  });

  return Response.json(gems);
}
