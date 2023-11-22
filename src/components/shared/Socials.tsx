import IG from "@/img/social-ig.svg";
import FB from "@/img/social-fb.svg";
import YT from "@/img/social-yt.svg";
import LI from "@/img/social-li.svg";
import M from "@/img/social-m.svg";

interface Socialsprops {
  classes?: string;
}

export default function Socials(props: Socialsprops) {
  return (
    <div
      className={`[&>a>svg]:h-6 [&>a>svg]:w-6 [&>a]:inline-block [&>a]:p-2 [&>a]:text-white [&>a]:transition-[color] [&>a]:duration-300 [&>a]:ease-in-out hover:[&>a]:!text-ex-light-grey ${props.classes}`}
    >
      {/* Instagram */}
      <a href="https://www.instagram.com/exceptionalalien/" target="_blank" title="Instagram">
        <IG />
      </a>

      {/* Facebook */}
      <a href="https://www.facebook.com/exceptionalalien" target="_blank" title="Facebook">
        <FB />
      </a>

      {/* YouTube */}
      <a href="https://www.youtube.com/@exceptional_alien" target="_blank" title="YouTube">
        <YT />
      </a>

      {/* LinkedIn */}
      {/*<a href="https://www.linkedin.com/company/exceptional-alien" target="_blank" title="LinkedIn">
        <LI />
  </a>*/}

      {/* Medium */}
      <a href="https://medium.com/@exceptionalalien" target="_blank" title="Medium">
        <M />
      </a>
    </div>
  );
}
