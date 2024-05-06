import { FC } from "react";
import classNames from "classnames";
import { ImagePlaceholder } from "../image-placeholder";
import { SelectableContainer } from "../selectable-container";

export interface ImageProps {
  selected?: boolean;
  onSelect?(): void;
  url?: string;
}

export const Image: FC<ImageProps> = ({ selected, url, ...props }) => (
  <SelectableContainer className={classNames("img", { selected })} {...props}>
    {url ? <img src={url} alt="" /> : <ImagePlaceholder />}
  </SelectableContainer>
);
