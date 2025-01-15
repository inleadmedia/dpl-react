import React from "react";
import { Cover, CoverProps } from "../../cover/cover";

type CardListItemCoverProps = Omit<CoverProps, "animate" | "size">;
const CardListItemCover: React.FC<CardListItemCoverProps> = ({
  ids,
  bestRepresentation,
  alt,
  url,
  tint,
  linkAriaLabelledBy,
  customCoverUrl
}) => {
  return (
    <Cover
      customCoverUrl={customCoverUrl}
      animate
      ids={ids}
      bestRepresentation={bestRepresentation}
      size="small"
      alt={String(alt)}
      url={url}
      tint={tint}
      linkAriaLabelledBy={linkAriaLabelledBy}
    />
  );
};

export default CardListItemCover;
