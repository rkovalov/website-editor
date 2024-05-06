import { FC } from "react";

import { Context } from "../../state";
import { useLoadData } from "../../hooks";

import { EditorMain } from "../EditorMain";
import { EditorControls } from "../EditorControls";

import "./Editor.css";

export const Editor: FC = () => {
  const [state, setState] = useLoadData();
  console.log({ state });
  return (
    <div className="editor">
      <Context.Provider value={{ ...state, setState }}>
        <EditorMain />
        <EditorControls />
      </Context.Provider>
    </div>
  );
};
