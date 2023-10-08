import IG from "@/img/social-ig.svg";
import Globe from "@/img/globe.svg";
import FB from "@/img/social-fb.svg";
import YT from "@/img/social-yt.svg";
import LI from "@/img/social-li.svg";
import TT from "@/img/social-tt.svg";

export default function Socials({ ig, other, www }: { ig: string; other: string; www: string }) {
  var otherSocial = "Other";

  if (other && other.indexOf("instagram.com") > 0) {
    otherSocial = "Instagram";
  } else if (other && other.indexOf("facebook.com") > 0) {
    otherSocial = "Facebook";
  } else if (other && other.indexOf("youtube.com") > 0) {
    otherSocial = "YouTube";
  } else if (other && other.indexOf("linkedin.com") > 0) {
    otherSocial = "LinkedIn";
  } else if (other && other.indexOf("tiktok.com") > 0) {
    otherSocial = "TikTok";
  }

  return (
    <div
      className={`absolute top-0 right-0 bg-white [&_*]:inline-block hover:[&>a]:text-ex-light-grey [&>a]:duration-300 [&>a]:ease-in-out [&>a]:transition-[color] [&>a>svg]:h-6 [&>a>svg]:box-content [&>a>svg]:p-2 [&>a>svg]:align-[-16px] [&>a>p]:text-xs [&>a>p]:ml-1 [&>a>p]:md:ml-2`}
    >
      {/* Instagram */}
      {ig && (
        <a href={`https://instagram.com/${ig.replace(/@/g, "")}`} target="_blank" title="Instagram">
          {otherSocial === "Instagram" && <p className="max-[320px]:!hidden">@{ig.replace(/@/g, "")}</p>}
          <IG className="!pl-1 md:!pl-2" />
        </a>
      )}

      {/* Other */}
      {other && (
        <a href={other} target="_blank" title={otherSocial}>
          {otherSocial === "Instagram" && (
            <p className="max-[320px]:!hidden">@{other.split(".com")[1].replace(/\//g, "")}</p>
          )}

          {/* Icon */}
          {otherSocial === "Instagram" ? (
            <IG className="!pl-1 md:!pl-2" />
          ) : otherSocial === "Facebook" ? (
            <FB />
          ) : otherSocial === "YouTube" ? (
            <YT />
          ) : otherSocial === "LinkedIn" ? (
            <LI />
          ) : otherSocial === "TikTok" ? (
            <TT />
          ) : (
            <Globe />
          )}
        </a>
      )}

      {/* Website */}
      {www && (
        <a href={www} target="_blank" title="Website">
          <Globe />
        </a>
      )}
    </div>
  );
}
