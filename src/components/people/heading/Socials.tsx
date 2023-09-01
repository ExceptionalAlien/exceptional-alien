import IG from "@/img/social-ig.svg";
import Globe from "@/img/globe.svg";
import FB from "@/img/social-fb.svg";
import YT from "@/img/social-yt.svg";
import LI from "@/img/social-li.svg";

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
  }

  return (
    <div
      className={`absolute top-0 right-0 [&_*]:inline-block hover:[&>*]:opacity-50 [&>*]:duration-300 [&>*]:transition-opacity [&_svg]:h-6 [&_svg]:box-content [&_svg]:p-2 [&_span]:text-xs [&_span]:md:ml-1`}
    >
      {/* Instagram */}
      {props.ig && (
        <a href={props.ig} target="_blank" title="Instagram">
          <span className={`md:!inline-block ${props.other && props.www && "!hidden"}`}>
            @{props.ig.split(".com")[1].replace(/\//g, "")}
          </span>
          <IG className="!pl-1 md:!pl-2" />
        </a>
      )}

      {/* Other */}
      {props.other && (
        <a href={props.other} target="_blank" title={otherSocial}>
          {otherSocial === "Instagram" && (
            <span className={`md:!inline-block ${props.www && "!hidden"}`}>
              @{props.other.split(".com")[1].replace(/\//g, "")}
            </span>
          )}
          {otherSocial === "Instagram" ? (
            <IG className="!pl-1 md:!pl-2" />
          ) : otherSocial === "Facebook" ? (
            <FB />
          ) : otherSocial === "YouTube" ? (
            <YT />
          ) : otherSocial === "LinkedIn" ? (
            <LI />
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
