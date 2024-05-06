import { createContext } from "react";
import type { Element, StageElement, ColumnElement, RowElement, MarkdownElement } from "./types";
import { initStage, initRow, initColumn, initMarkdown } from "./utils";

export interface State {
  selectedElementId: Nullable<string>;
  elements: Record<string, Element>;
  elementIds: string[];
}

export const initState = (): State => {
  const newStage = initStage();
  const newRow = initRow();
  const newMarkdown = initMarkdown();
  const newColumn = initColumn();

  const stage: StageElement = { ...newStage, elementsIds: [newRow.id], parentId: "page" as const };
  const row: RowElement = { ...newRow, elementsIds: [newColumn.id], parentId: stage.id };
  const markdown: MarkdownElement = { ...newMarkdown, parentId: newColumn.id };
  const column: ColumnElement = { ...newColumn, elementsIds: [markdown.id], parentId: row.id };

  return {
    selectedElementId: null,
    elementIds: [stage.id],
    elements: [stage, row, column, markdown].reduce((acc, el) => ({ ...acc, [el.id]: el }), {}),
  };
};

export interface ContextType extends State {
  setState: (s: Partial<State>) => void;
}

export const Context = createContext<ContextType>({
  elementIds: [],
  elements: {},
  selectedElementId: null,
  setState: () => {},
});
