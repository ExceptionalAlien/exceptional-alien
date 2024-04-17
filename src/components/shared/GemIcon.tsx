import Image from "next/image";
import GemBG from "@/img/icon-gem-bg.svg";
import GemBorder from "@/img/icon-gem-border.svg";
import MarkerBG from "@/img/icon-marker-bg.svg";
import MarkerBorder from "@/img/icon-marker-border.svg";

type GemIconProps = {
  category: string;
  marker?: boolean; // Markers use different border and background
  hideBg?: boolean;
  creator?: string | null | undefined;
  color?: string | null | undefined;
  classes?: string;
};

export default function GemIcon(props: GemIconProps) {
  const css = `
  .gem-icon {
    color: #${props.color ? props.color : "2220c1"};
  }

  .selected-gem .gem-icon-bg {
    color: #${props.color ? props.color : "2220c1"} !important;
  }
  
  .selected-gem .gem-icon-category {
    color: white !important;
  }
`;

  return (
    <div
      className={`gem-icon flex items-center justify-center [&>svg]:overflow-visible [&>svg]:transition-[color] [&>svg]:duration-300 [&>svg]:ease-in-out ${
        props.hideBg
          ? "h-5 w-5 [&>svg]:h-full [&>svg]:w-full"
          : "absolute h-10 w-10 md:h-12 md:w-12 [&>svg]:absolute [&>svg]:h-2/5 [&>svg]:w-2/5"
      } ${props.classes}`}
    >
      <style>{css}</style>

      {props.creator ? (
        <Image
          src={props.creator}
          alt={props.category}
          width={48}
          height={48}
          className="h-10 w-10 rounded-full border border-white md:h-12 md:w-12"
        />
      ) : (
        <>
          <GemBG className={`gem-icon-bg !h-full !w-full text-white ${(props.marker || props.hideBg) && "hidden"}`} />

          <MarkerBG
            className={`gem-icon-bg !h-full !w-full text-white ${(!props.marker || props.hideBg) && "hidden"}`}
          />

          <GemBorder className={`!h-full !w-full ${(props.marker || props.hideBg) && "hidden"}`} />
          <MarkerBorder className={`!h-full !w-full ${(!props.marker || props.hideBg) && "hidden"}`} />

          {props.category === "Food & Drink" && (
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 80.26 84.45"
              className="gem-icon-category"
            >
              <path d="M62.03 50.25c10.41-1.57 18.23-14.99 18.23-31.42 0-6.25-1.15-12.3-3.34-17.48L76.4.12H43.64l-.52 1.23c-2.18 5.19-3.34 11.23-3.34 17.48 0 16.48 7.8 29.85 18.23 31.42v30.17H47.25v4.02h25.54v-4.02H62.03V50.25ZM43.8 18.83c0-5.23.87-10.28 2.53-14.69H73.7c1.66 4.41 2.53 9.46 2.53 14.69 0 14.28-6.55 26.31-14.92 27.47l-2.45.02C50.4 45.27 43.8 33.24 43.8 18.83ZM25.15 18.94h-.01L24.88 0l-4.02.05.26 19c-.06 1.81-1.41 2.5-2.28 2.5-.2 0-1-1.14-1-3.69V.03h-4.02v17.83c0 2.15-.91 3.28-1.18 3.35-.29-.07-1.2-1.2-1.2-3.35V.03H7.42v17.83c0 2.55-.79 3.69-1 3.69-.87 0-2.22-.68-2.28-2.49L4.4.05.38 0 .13 18.94H.12c0 .07 0 .14.01.21L0 28.48c.1 3.96 3.02 7.51 7.42 9.19v41.46c0 2.92 2.34 5.3 5.21 5.3s5.21-2.37 5.21-5.3V37.67c4.4-1.68 7.32-5.24 7.42-9.27l-.12-9.27v-.2Zm-9.83 15.34-1.49.4v44.47c0 .71-.54 1.28-1.19 1.28-.66 0-1.19-.58-1.19-1.29V34.67l-1.49-.4c-3.48-.93-5.87-3.3-5.93-5.81l.05-3.38c.76.32 1.56.48 2.36.48 1.31 0 2.41-.56 3.25-1.57.83.78 1.84 1.22 2.95 1.22s2.13-.45 2.95-1.22c.84 1.01 1.95 1.57 3.25 1.57.8 0 1.61-.17 2.36-.48l.04 3.3c-.06 2.6-2.45 4.96-5.93 5.89Z" />
            </svg>
          )}

          {props.category === "Nature" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              data-name="Layer 1"
              viewBox="0 0 13.25 19.64"
              className="gem-icon-category"
            >
              <path d="M6.62 19.64C2.97 19.64 0 15.23 0 9.82S2.97 0 6.62 0s6.62 4.41 6.62 9.82-2.97 9.82-6.62 9.82ZM6.62 1C3.52 1 1 4.96 1 9.82c0 4.6 2.26 8.39 5.12 8.79v-2.99l-4-4 .71-.71 3.29 3.29v-3.07L2.89 7.91l.71-.71 2.52 2.52V4.45h1v2.48l2.02-2.02.71.71-2.72 2.72v3.64L9.91 9.2l.71.71-3.49 3.49v5.21c2.87-.4 5.12-4.19 5.12-8.79C12.25 4.96 9.73 1 6.63 1Z" />
            </svg>
          )}

          {props.category === "Accommodation" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              data-name="Layer 1"
              viewBox="0 0 20.03 15.15"
              className="gem-icon-category"
            >
              <path d="M19.04 15.15H.36v-2.31H0V8.08c0-.93.68-1.76 1.59-1.93V0h16.84v6.13c.92.2 1.59 1.01 1.59 1.93v4.79h-.36v2.28l-.63.03Zm-17.68-1 17.3-.03v-1.41H1.36v1.44Zm16.07-7.29H2.59m-.78.28c-.47.08-.81.5-.81.95v3.63h18.03V8.07c0-.45-.34-.85-.81-.95m-2.59-1.25h1.8V1H2.59v4.85h1.32V4c0-.6.52-1.09 1.15-1.09h4.06c.24 0 .47.07.65.19.19-.12.41-.19.65-.19h4.06c.64 0 1.15.49 1.15 1.09v1.85Zm-5.21 0h4.06c.1 0 .15-.06.15-.09V4.02s-.05-.09-.15-.09h-4.06c-.1 0-.15.06-.15.09v1.76s.05.09.15.09Zm-5.37 0h4.06c.1 0 .15-.06.15-.09V4.02s-.06-.09-.15-.09H5.05c-.1 0-.15.06-.15.09v1.76s.05.09.15.09Z" />
            </svg>
          )}

          {props.category === "Culture" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              data-name="Layer 1"
              viewBox="0 0 19.49 17.09"
              className={`gem-icon-category ${!props.hideBg && "mb-[2px] md:mb-[3px]"}`}
            >
              <path d="M18.24 17.09h-17v-3h2v-8H0L9.74 0l9.74 6.09h-3.24v8h2v3Zm-16-1h15v-1h-15v1Zm12-2h1v-8h-1v8Zm-3 0h2v-8h-2v8Zm-2 0h1v-8h-1v8Zm-3 0h2v-8h-2v8Zm-2 0h1v-8h-1v8Zm-.76-9h12.51L9.73 1.18 3.47 5.09Z" />
            </svg>
          )}

          {props.category === "Events" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              data-name="Layer 1"
              viewBox="0 0 17.21 18.07"
              className="gem-icon-category"
            >
              <path d="M9 18.07c-4.96 0-9-4.05-9-9.03S4.04 0 9 0h1.25l-.91.86c-1.46 1.39-2.3 3.32-2.3 5.31 0 4.57 4.21 8.16 8.95 7.03l1.21-.29-.68 1.05a8.933 8.933 0 0 1-7.53 4.11ZM7.79 1.09C3.95 1.68 1 5.02 1 9.04c0 4.43 3.59 8.04 8 8.04 2.3 0 4.46-.99 5.96-2.69-4.85.42-8.92-3.43-8.92-8.21 0-1.83.63-3.63 1.75-5.08Z" />
            </svg>
          )}

          {props.category === "Retail" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              data-name="Layer 1"
              viewBox="0 0 17.92 18"
              className={`gem-icon-category ${!props.hideBg && "mb-[2px] md:mb-[3px]"}`}
            >
              <path d="M17.92 18H0L.72 6.35h4.34V3.91h1v2.44h5.81V3.91h1v2.44h4.33L17.92 18ZM1.07 17h15.79l-.6-9.65h-3.39v4.03h-1V7.35H6.06v4.03h-1V7.35h-3.4L1.06 17ZM12.86 3.9h-1c0-.76-.31-1.51-.85-2.05C9.92.76 7.99.76 6.9 1.85c-.55.55-.85 1.28-.85 2.05h-1c0-1.04.41-2.02 1.14-2.76C6.93.4 7.91 0 8.95 0s2.03.42 2.76 1.14c.74.74 1.14 1.72 1.14 2.76Z" />
            </svg>
          )}

          {props.category === "Wellness" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              data-name="Layer 1"
              viewBox="0 0 19 15.82"
              className="gem-icon-category"
            >
              <path d="M7.91 15.82c-1.95 0-3.89-.33-5.53-1.83C.85 12.58.05 10.83 0 8.79V5.86l1.19-.02c1.38-.03 2.81-.06 4.19.45.04-.43.12-.85.24-1.26.31-1.1.9-2.09 1.74-2.95.37-.38.75-.75 1.14-1.14l.94-.93.88.85c1.2 1.15 2.44 2.33 2.94 4.11l.03.12c.11.43.19.85.24 1.26.78-.3 1.61-.46 2.5-.48h2.95L19 7.06c.04 1.67.07 3.39-.84 5.01-.92 1.63-2.2 2.74-3.82 3.28-.81.28-1.67.38-2.32.44-.59.05-1.19.04-1.77.03H9.06c-.38.01-.76.03-1.14.03ZM1 6.84V8.77c.04 1.75.73 3.26 2.06 4.48 1.68 1.54 3.76 1.65 5.93 1.54v-.11c-.02-.56-.03-1.12 0-1.67v-.14c-.06-.59-.15-1.37-.39-2.08-.48-1.38-1.4-2.44-2.84-3.25-1.4-.77-2.92-.74-4.53-.71h-.21Zm8.99 7.95h.26c.58.01 1.13.02 1.66-.03.6-.06 1.38-.15 2.09-.4 1.37-.46 2.47-1.41 3.27-2.82.77-1.38.74-2.89.71-4.5v-.21H16.03c-1.79.04-3.26.71-4.5 2.05-1.11 1.2-1.48 2.6-1.56 4.09.03.51.02 1.02 0 1.52V14.78Zm2.3-9.57c-.42-1.51-1.51-2.55-2.67-3.66l-.18-.17-.24.24c-.38.38-.76.75-1.12 1.13-.74.76-1.23 1.58-1.5 2.53-.13.47-.21.95-.23 1.45 1.53.89 2.59 2.1 3.14 3.62.28-.75.7-1.47 1.32-2.14.54-.58 1.12-1.05 1.75-1.42-.02-.47-.1-.97-.24-1.47" />
            </svg>
          )}

          {props.category === "Neighbourhoods" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 12 17.35"
              className="gem-icon-category"
            >
              <path d="m6.02 17.35-.41-.55C5.38 16.5.01 9.39.01 6.17 0 2.77 2.69 0 6 0s6 2.77 6 6.17c.03 2.5-5.02 9.79-5.59 10.62l-.39.56ZM6 1C3.24 1 1 3.32 1 6.17c0 2.2 3.28 7.15 4.98 9.47 1.7-2.5 5.03-7.76 5.02-9.47C11 3.31 8.76.99 6 .99Z" />
              <path d="M6 9C4.35 9 3 7.65 3 6s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3Zm0-5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.92-2-2-2Z" />
            </svg>
          )}
        </>
      )}
    </div>
  );
}
