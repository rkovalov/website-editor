import { FC } from "react";
import cx from "classnames";
import { SelectableContainer } from "../selectable-container";
import MarkdownBase, { MarkdownToJSX } from "markdown-to-jsx";

export interface MarkdownProps {
  selected?: boolean;
  onSelect?(): void;
  id?: string;
  className?: string;
  content?: string;
  children?: string;
  align?: "left" | "right" | "center";
  options?: MarkdownToJSX.Options;
}

export const Markdown: FC<MarkdownProps> = ({ selected, align, content, children, onSelect, ...props }) => (
  <SelectableContainer className={cx("markdown", { selected })} onSelect={onSelect}>
    {/* <Markdown >{contentElement.content}</Markdown> */}
    <MarkdownBase {...props} className={`text-align-${align}`} options={{ forceBlock: true, ...props.options }}>
      {content || children || ""}
    </MarkdownBase>
  </SelectableContainer>
);
