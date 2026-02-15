export type PhotoProps = { src: string; alt: string };

export function Photo({ src, alt }: PhotoProps) {
  return (
    <>
      <img src={src} alt={alt} className="photo" />
    </>
  );
}
