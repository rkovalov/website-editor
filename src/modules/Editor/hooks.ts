import { useCallback, useContext, useState, useEffect } from "react";
import deepmerge from "deepmerge";
import store2 from "store2";

import packageJson from "../../../package.json";

import { Context, State, initState } from "./state";
import { initElement, isImageElement, isMarkdownElement, findGridElement, isGridElement } from "./utils";

import { Element, ElementTypes, ImageElement, MarkdownElement } from "./types";

const dataVersion = `editor-${packageJson.version}`;

export const useLoadData = (): [State, (s: Partial<State>) => void] => {
  const [state, setState] = useState(initState());

  useEffect(() => {
    const localStorageState = store2.get(dataVersion);
    // TODO: validate;
    if (localStorageState) {
      setState(localStorageState);
    }
  }, []);

  useEffect(() => {
    store2.set(dataVersion, state);
  }, [state]);

  const _setState = useCallback(
    (partialState: Partial<typeof state>) => {
      setState((prevState) => deepmerge(prevState, partialState, { arrayMerge: (_dest, source) => source }));
    },
    [setState]
  );

  return [state, _setState];
};

export const useData = () => {
  const { setState, ...state } = useContext(Context);

  const onElementSelect = useCallback(
    (id: string) => () => {
      setState({ selectedElementId: id });
    },
    [setState]
  );
  return { ...state, setState, onElementSelect };
};

export const useElement = <E extends Element>(id?: Nullable<string>): E | undefined => {
  const { elements } = useData();
  if (!id) {
    return;
  }
  return elements[id] as E;
};

export const useControls = () => {
  const { elementIds, elements, selectedElementId, setState } = useData();
  const selectedElement = useElement(selectedElementId);
  // const selectedElement = selectedElementId ? elements[selectedElementId] : null;

  const selectElement = useCallback((selectedElementId: string) => setState({ selectedElementId }), [setState]);

  const onClear = useCallback(() => setState(initState()), [setState]);

  const addElement = useCallback(
    (type: ElementTypes) => () => {
      // Use for now only one stage for editor
      const element = selectedElementId && findGridElement(selectedElementId, elements);
      const sourceElement = element ? element : elements[elementIds[0]];
      if (!isGridElement(sourceElement)) {
        throw new Error(`[Hooks]: Invalid source element type '${sourceElement.type}'. Cannot add the new element.`);
      }
      const newElement = initElement(type);

      sourceElement.elementsIds.push(newElement.id);
      setState({ elements: { [newElement.id]: { ...newElement, parentId: sourceElement.id } } });
      selectElement(newElement.id);
    },
    [elementIds, elements, selectedElementId, selectElement, setState]
  );

  const onPropertyUpdate = useCallback(
    (newProperty: Partial<ImageElement> | Partial<MarkdownElement>) => {
      if (!selectedElementId) {
        return;
      }
      const element = elements[selectedElementId];
      if (isImageElement(element)) {
        const newImage = { ...element, ...newProperty };
        setState({
          elements: {
            [newImage.id]: { ...newImage },
          },
        });
      }
      if (isMarkdownElement(element)) {
        const newMarkdown = { ...element, ...newProperty };
        setState({
          elements: {
            [newMarkdown.id]: { ...newMarkdown },
          },
        });
      }
    },
    [elements, selectedElementId, setState]
  );

  return { selectedElement, onClear, addElement, onPropertyUpdate };
};
