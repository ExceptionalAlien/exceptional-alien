import { createClient } from "@/prismicio";
import { filter } from "@prismicio/client";

export async function GET(request: Request, { params }: { params: { destinationid: string } }) {
  const client = createClient();

  const gems = await client.getAllByType("gem", {
    fetchOptions: {
      cache: "no-store",
    },
    fetch: "gem.title,gem.image,gem.category,gem.playbooks",
    filters: [filter.at("my.gem.destination", params.destinationid)],
    fetchLinks: "playbook.creator,creator.profile_image",
  });

  return Response.json(gems);
}
