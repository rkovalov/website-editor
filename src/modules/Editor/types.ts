/* eslint-disable @typescript-eslint/no-redeclare */
export type Align = "left" | "center" | "right";

type Id = string;
type Url = string;
type Content = string;

export const GridElementTypes = {
  Stage: "stage",
  Row: "row",
  Column: "column",
} as const;

export const ContentElementTypes = {
  Markdown: "markdown",
  Image: "image",
} as const;

export const ElementTypes = {
  ...GridElementTypes,
  ...ContentElementTypes,
} as const;

export type GridElementTypes = Values<typeof GridElementTypes>;
export type ContentElementTypes = Values<typeof ContentElementTypes>;
export type ElementTypes = GridElementTypes | ContentElementTypes;

export interface BaseElement<T extends ElementTypes> {
  id: Id;
  type: T;
  parentId: Id;
}

export interface GridElement<T extends GridElementTypes = GridElementTypes> extends BaseElement<T> {
  elementsIds: GridElement["id"][];
}

export type ContentElement<T extends ContentElementTypes = ContentElementTypes> = BaseElement<T>;

export type Element<T extends ElementTypes = ElementTypes> = T extends GridElementTypes
  ? GridElement<T>
  : T extends ContentElementTypes
  ? ContentElement<T>
  : GridElement | ContentElement;

export type NewElement<E extends Element> = Omit<E, "parentId">;

// Content Elements
export interface ImageElement extends ContentElement<"image"> {
  url: Url;
}
export interface MarkdownElement extends ContentElement<"markdown"> {
  content: Content;
  align: Align;
}
// End Content Elements

// Grid Elements

export interface StageElement extends GridElement<"stage"> {
  parentId: "page";
}

export interface RowElement extends GridElement<"row"> {}

export interface ColumnElement extends GridElement<"column"> {}

// End Grid Elements
