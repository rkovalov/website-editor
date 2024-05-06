import { FC, useCallback } from "react";
import cx from "classnames";

import { Icons } from "../../../../components";

import { useControls } from "../../hooks";
import { isImageElement, isMarkdownElement } from "../../utils";
import { Align, ContentElementTypes, GridElementTypes, ImageElement, MarkdownElement } from "../../types";

import "./EditorControls.css";

export interface EditorControlsProps {
  className?: string;
}

export const EditorControls: FC<EditorControlsProps> = ({ className }) => {
  const { selectedElement, addElement, onPropertyUpdate, onClear } = useControls();

  const isImageSelected = isImageElement(selectedElement);
  const isMarkdownSelected = isMarkdownElement(selectedElement);

  const onChange = useCallback(
    (field: keyof Partial<ImageElement> | keyof Partial<MarkdownElement>) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onPropertyUpdate({ [field]: e.target.value });
      },
    [onPropertyUpdate]
  );

  const onAlignChange = useCallback(
    (align: Align) => () => {
      onPropertyUpdate({ align });
    },
    [onPropertyUpdate]
  );
  return (
    <div className={cx("editor-controls", className)}>
      <div className="section">
        <div className="actions">
          <button className="action" onClick={onClear}>
            Clear
          </button>
        </div>
      </div>

      <div className="section">
        <div className="section-header">Page</div>
        <div className="actions">
          <button className="action" onClick={addElement(GridElementTypes.Row)}>
            Add row
          </button>
        </div>
      </div>
      <div className="section">
        <div className="section-header">Row</div>
        <div className="actions">
          <button className="action" onClick={addElement(GridElementTypes.Column)}>
            Add column
          </button>
        </div>
      </div>
      <div className="section">
        <div className="section-header">Column</div>
        <div className="button-group-field">
          <label>Contents</label>
          <div className="button-group">
            <button className={cx({ selected: isMarkdownSelected })} onClick={addElement(ContentElementTypes.Markdown)}>
              <Icons.Text />
            </button>
            <button className={cx({ selected: isImageSelected })} onClick={addElement(ContentElementTypes.Image)}>
              <Icons.Image />
            </button>
          </div>
        </div>
      </div>

      {isMarkdownSelected && (
        <div className="section">
          <div className="section-header">Text</div>
          <div className="button-group-field">
            <label>Alignment</label>
            <div className="button-group">
              <button className={cx({ selected: selectedElement.align === "left" })} onClick={onAlignChange("left")}>
                <Icons.TextAlignLeft />
              </button>
              <button
                className={cx({ selected: selectedElement.align === "center" })}
                onClick={onAlignChange("center")}
              >
                <Icons.TextAlignCenter />
              </button>
              <button className={cx({ selected: selectedElement.align === "right" })} onClick={onAlignChange("right")}>
                <Icons.TextAlignRight />
              </button>
            </div>
          </div>
          <div className="textarea-field">
            <textarea
              autoFocus
              rows={8}
              placeholder="Enter text"
              value={selectedElement.content}
              onChange={onChange("content")}
            />
          </div>
        </div>
      )}

      {isImageSelected && (
        <div className="section">
          <div className="section-header">Image</div>
          <div className="text-field">
            <label htmlFor="image-url">URL</label>
            <input autoFocus id="image-url" type="text" value={selectedElement.url} onChange={onChange("url")} />
          </div>
        </div>
      )}
    </div>
  );
};
