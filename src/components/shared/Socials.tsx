import IG from "@/img/social-ig.svg";
import FB from "@/img/social-fb.svg";
import YT from "@/img/social-yt.svg";
import LI from "@/img/social-li.svg";

export default function Socials({ classes }: { classes?: string }) {
  return (
    <div
      className={`[&>a>svg]:h-6 [&>a>svg]:w-6 [&>a]:inline-block [&>a]:p-2 [&>a]:text-white [&>a]:transition-[color] [&>a]:duration-300 [&>a]:ease-in-out hover:[&>a]:text-ex-light-grey ${classes}`}
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
