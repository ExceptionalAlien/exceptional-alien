import IG from "@/img/social-ig.svg";
import Globe from "@/img/globe.svg";
import FB from "@/img/social-fb.svg";
import YT from "@/img/social-yt.svg";
import LI from "@/img/social-li.svg";
import TT from "@/img/social-tt.svg";

type SocialsProps = {
  ig: string;
  other: string;
  www: string;
};

export default function Socials(props: SocialsProps) {
  var otherSocial = "";

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
      className={`absolute right-0 top-0 [&>a>p]:text-xs [&>a>svg]:h-6 [&>a>svg]:w-6 [&>a]:p-2 [&>a]:transition-[color] [&>a]:duration-300 [&>a]:ease-in-out hover:[&>a]:text-ex-light-grey [&_*]:inline-block`}
    >
      {/* Instagram */}
      {props.ig && (
        <a href={`https://instagram.com/${props.ig.replace(/@/g, "")}`} target="_blank" title="Instagram">
          {otherSocial === "Instagram" && <p className="max-[320px]:!hidden">@{props.ig.replace(/@/g, "")}</p>}
          <IG className={`${otherSocial === "Instagram" && "ml-1"}`} />
        </a>
      )}

      {/* Other */}
      {props.other && (
        <a
          href={props.other}
          target="_blank"
          title={otherSocial}
          className={`${otherSocial === "Instagram" && "!pl-1"}`}
        >
          {otherSocial === "Instagram" && (
            <p className="max-[320px]:!hidden">@{props.other.split(".com")[1].replace(/\//g, "")}</p>
          )}

          {/* Icon */}
          {otherSocial === "Instagram" ? (
            <IG className="ml-1" />
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
