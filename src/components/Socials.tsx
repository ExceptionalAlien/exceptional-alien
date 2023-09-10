import IG from "@/img/social-ig.svg";
import FB from "@/img/social-fb.svg";
import YT from "@/img/social-yt.svg";
import LI from "@/img/social-li.svg";

export default function Socials(props: { classes?: string }) {
  return (
    <div
      className={`[&>a]:inline-block hover:[&>a]:opacity-50 [&>a]:duration-300 [&>a]:ease-in-out [&>a]:transition-opacity [&>a>svg]:fill-white [&>a>svg]:h-6 [&>a>svg]:box-content [&>a>svg]:p-2 ${props.classes}`}
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
      <a href="https://www.linkedin.com/company/exceptional-alien" target="_blank" title="LinkedIn">
        <LI />
      </a>
    </div>
  );
}
