import { createClient } from "@/prismicio";

export async function GET(request: Request, { params }: { params: { uid: string } }) {
  const client = createClient();

  const playbook = await client.getByUID("playbook", params.uid, {
    fetchOptions: {
      cache: "no-store",
    },
    fetch:
      "playbook.description,playbook.slices,playbook.sub_title,playbook.app_title,playbook.image,playbook.locked,playbook.creator,playbook.destination",
    fetchLinks:
      "creator.first_name,creator.last_name,creator.title,creator.profile_image,destination.title,gem.title,gem.category,gem.description,gem.address",
  });

  return Response.json(playbook);
}
