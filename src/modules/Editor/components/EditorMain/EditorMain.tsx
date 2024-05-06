import { FC, memo, useCallback } from "react";
import cx from "classnames";

import { Element } from "../Element";
import { useData } from "../../hooks";

interface EditorMainProps {
  className?: string;
}

export const EditorMain: FC<EditorMainProps> = memo(({ className }) => {
  const { elementIds, selectedElementId, onElementSelect } = useData();

  const isElementSelected = useCallback((id: string) => id === selectedElementId, [selectedElementId]);

  return (
    <main className={cx("editor-main", className)}>
      {elementIds.map((id) => (
        <Element key={id} id={id} isElementSelected={isElementSelected} onElementSelect={onElementSelect} />
      ))}
    </main>
  );
});
