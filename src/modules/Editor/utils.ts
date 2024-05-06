import { nanoid } from "nanoid";

import {
  Element,
  NewElement,
  StageElement,
  RowElement,
  ColumnElement,
  ImageElement,
  MarkdownElement,
  ElementTypes,
  ContentElementTypes,
  GridElement,
  GridElementTypes,
} from "./types";

export const id = (): string => nanoid(10);

export const initStage = (): NewElement<StageElement> => ({
  id: id(),
  type: ElementTypes.Stage,
  elementsIds: [],
});

export const initRow = (): NewElement<RowElement> => ({
  id: id(),
  type: ElementTypes.Row,
  elementsIds: [],
});

export const initColumn = (): NewElement<ColumnElement> => ({
  id: id(),
  type: ElementTypes.Column,
  elementsIds: [],
});

export const initImage = (): NewElement<ImageElement> => ({
  id: id(),
  type: ContentElementTypes.Image,
  url: "",
});

export const initMarkdown = (): NewElement<MarkdownElement> => ({
  id: id(),
  type: ContentElementTypes.Markdown,
  content: "#### Untitled",
  align: "left",
});

export const initElement = <T extends ElementTypes>(type: T) => {
  switch (type) {
    case "column":
      return initColumn();
    case "image":
      return initImage();
    case "markdown":
      return initMarkdown();
    case "row":
      return initRow();
    case "stage":
      return initStage();
    default:
      throw new Error(`[Utils]: Invalid element type '${type}'. Cannot initialize a new element.`);
  }
};

// @ts-ignore
export const isGridElement = (el?: Nullable<Element>): el is GridElement =>
  Boolean(el && (Object.values(GridElementTypes) as string[]).includes(el.type));

export const isRowElement = (el?: Nullable<Element>): el is RowElement => el?.type === ElementTypes.Row;
export const isColumnElement = (el?: Nullable<Element>): el is ColumnElement => el?.type === ElementTypes.Column;
export const isImageElement = (el?: Nullable<Element>): el is ImageElement => el?.type === ContentElementTypes.Image;
export const isMarkdownElement = (el?: Nullable<Element>): el is MarkdownElement =>
  el?.type === ContentElementTypes.Markdown;

export const findGridElement = (elementId: string, elements: Record<string, Element>) => {
  const current = elements?.[elementId];
  if (!current) {
    return;
  }
  const validateElements = [current];
  while (validateElements.length) {
    const element = validateElements.pop();
    if (isGridElement(element)) {
      return element;
    }
    const parent = element && elements[element.parentId];
    if (parent) {
      validateElements.push(parent);
    }
  }
};
