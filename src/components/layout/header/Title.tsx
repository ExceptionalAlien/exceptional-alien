import { useRouter } from "next/router";
import Link from "next/link";
import Place from "@/img/icon-place.svg";
import Playbook from "@/img/icon-playbook.svg";
import Person from "@/img/icon-person.svg";

export default function Title() {
  const router = useRouter();
  const page = router.pathname.split("/")[1];
  const showTitle = page === "people" || page === "playbooks" || page === "destinations" ? true : false;

  return (
    <Link
      href={"/" + page}
      className={`inline-block align-middle font-bold text-xl md:text-3xl ml-2 md:ml-4 capitalize [&>svg]:h-4 [&>svg]:md:h-6 [&>svg]:inline-block [&>svg]:ml-2 [&>svg]:md:ml-3 [&>svg]:align-[-2px] [&>svg]:md:align-[-3px] ${
        !showTitle && "hidden"
      }`}
    >
      {page}
      {page === "destinations" ? <Place /> : page === "playbooks" ? <Playbook /> : <Person />}
    </Link>
  );
}
