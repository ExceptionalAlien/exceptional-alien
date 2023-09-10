import IG from "@/img/social-ig.svg";
import Globe from "@/img/globe.svg";
import FB from "@/img/social-fb.svg";
import YT from "@/img/social-yt.svg";
import LI from "@/img/social-li.svg";
import TT from "@/img/social-tt.svg";

export default function Socials(props: { ig: string; other: string; www: string }) {
  var otherSocial = "Other";

  if (props.other && props.other.indexOf("instagram.com") > 0) {
    otherSocial = "Instagram";
  } else if (props.other && props.other.indexOf("facebook.com") > 0) {
    otherSocial = "Facebook";
  } else if (props.other && props.other.indexOf("youtube.com") > 0) {
    otherSocial = "YouTube";
  } else if (props.other && props.other.indexOf("linkedin.com") > 0) {
    otherSocial = "LinkedIn";
  } else if (props.other && props.other.indexOf("tiktok.com") > 0) {
    otherSocial = "TikTok";
  }

  return (
    <div
      className={`absolute top-0 right-0 bg-white [&_*]:inline-block hover:[&>a]:opacity-50 [&>a]:duration-300 [&>a]:ease-in-out [&>a]:transition-opacity [&>a>svg]:h-6 [&>a>svg]:box-content [&>a>svg]:p-2 [&>a>svg]:align-[-16px] [&>a>span]:text-xs [&>a>span]:ml-1 [&>a>span]:md:ml-2`}
    >
      {/* Instagram */}
      {props.ig && (
        <a href={`https://instagram.com/${props.ig.replace(/@/g, "")}`} target="_blank" title="Instagram">
          {otherSocial === "Instagram" && <span>@{props.ig.replace(/@/g, "")}</span>}
          <IG className="!pl-1 md:!pl-2" />
        </a>
      )}

      {/* Other */}
      {props.other && (
        <a href={props.other} target="_blank" title={otherSocial}>
          {otherSocial === "Instagram" && <span>@{props.other.split(".com")[1].replace(/\//g, "")}</span>}

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
      {props.www && (
        <a href={props.www} target="_blank" title="Website">
          <Globe />
        </a>
      )}
    </div>
  );
}
