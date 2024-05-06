import { FC, memo } from "react";

import { ElementTypes } from "../../types";
import { Stage, Row, Markdown, Column, Image } from "../../../../components";

import { useElement } from "../../hooks";
import { isGridElement } from "../../utils";

interface ElementProps {
  id: string;
  onElementSelect: (id: string) => () => void;
  isElementSelected: (id: string) => boolean;
}

export interface BaseElementProps {
  children?: React.ReactNode;
  selected?: boolean;
  onSelect?(): void;
}

const elementComponents: Record<ElementTypes, FC<BaseElementProps>> = {
  stage: Stage,
  row: Row,
  column: Column,
  // @ts-ignore
  markdown: Markdown,
  image: Image,
};

export const Element: FC<ElementProps> = memo(({ id, ...props }) => {
  const element = useElement(id);
  if (!element) {
    return null;
  }
  const ElementComponent = elementComponents[element.type];

  return (
    <ElementComponent
      selected={props.isElementSelected(element.id)}
      onSelect={props.onElementSelect(element.id)}
      {...element}
      {...props}
    >
      {isGridElement(element) && element.elementsIds?.map((_id) => <Element key={_id} id={_id} {...props} />)}
    </ElementComponent>
  );
});
