import IG from "@/img/social-ig.svg";
import FB from "@/img/social-fb.svg";
import LI from "@/img/social-li.svg";

export default function Socials() {
  return (
    <div className="absolute top-0 right-0 mr-1 md:mr-3 mt-3 [&>a]:inline-block [&_svg]:fill-white [&_svg]:h-6 [&_svg]:box-content [&_svg]:p-3">
      {/* Instagram */}
      <a href="https://www.instagram.com/exceptionalalien/" target="_blank" title="Instagram">
        <IG />
      </a>
      {/* Facebook */}
      <a href="https://www.facebook.com/exceptionalalien" target="_blank" title="Facebook">
        <FB />
      </a>
      {/* LinkedIn */}
      <a href="https://www.linkedin.com/company/exceptional-alien" target="_blank" title="LinkedIn">
        <LI />
      </a>
    </div>
  );
}
