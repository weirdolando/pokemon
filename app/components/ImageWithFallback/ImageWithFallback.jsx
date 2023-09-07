import { useState } from "react";
import Image from "next/image";
import Pokeball from "@/app/assets/pokeball.webp";

const ImageWithFallback = ({ src, fallbackSrc = Pokeball, ...delegated }) => {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      {...delegated}
    />
  );
};

export default ImageWithFallback;
