import { createClient } from "@/prismicio";

export async function GET(request: Request, { params }: { params: { uid: string } }) {
  const client = createClient();

  const playbook = await client.getByUID("creator", params.uid, {
    fetchOptions: {
      cache: "no-store",
    },
    fetch:
      "creator.first_name,creator.last_name,creator.title,creator.hero_image,creator.profile_image,creator.description,creator.short_description,creator.home_country,creator.home_city,creator.current_city,creator.instagram,creator.website,creator.playbooks",
    fetchLinks:
      "playbook.sub_title,playbook.creator,playbook.app_title,playbook.destination,playbook.slices,playbook.locked,playbook.image,destination.title,creator.first_name,creator.last_name,creator.title",
  });

  return Response.json(playbook);
}
