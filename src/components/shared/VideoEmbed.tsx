export default function VideoEmbed(props: VideoProps) {
  const hash = props.embed?.embed_url?.toString().replace("https://youtu.be/", "");
  const url = `https://www.youtube.com/embed/${hash}?feature=oembed&rel=0`;

  return (
    <iframe
      width="360"
      height="280"
      src={url}
      frameBorder="0"
      allow="fullscreen, accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={props.embed?.title ?? `Video clip`}
      referrerPolicy="strict-origin-when-cross-origin"
      style={{
        borderWidth: 0,
      }}
    />
  );
}

export type VideoProps = {
  embed: {
    embed_url?: string | null,
    title?: string | null,
  }
}
