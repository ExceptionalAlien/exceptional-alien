import { createClient } from "@/prismicio";

export async function GET(request: Request, { params }: { params: { uid: string } }) {
  const client = createClient();

  const playbook = await client.getByUID("gem", params.uid, {
    fetchOptions: {
      cache: "no-store",
    },
    fetch: "gem.title,gem.category,gem.playbooks,gem.description,gem.address,gem.image,gem.about,gem.website",
    fetchLinks:
      "playbook.sub_title,playbook.creator,playbook.app_title,playbook.destination,playbook.slices,playbook.locked,playbook.image,creator.profile_image,creator.first_name,creator.last_name,creator.title,destination.title",
  });

  return Response.json(playbook);
}
