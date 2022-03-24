import { useContext } from "react";
import "../../styles/dialog.scss";
import { NotesContext } from "../AppContextProvider/AppContextProvider";

export function DialogWindow() {
  const { deletion, exitConfirmation, confirm } = useContext(NotesContext);

  const children =
    deletion.type === "exclude_note"
      ? "Are you sure you want to delete this note?"
      : "Are you sure you want to delete this task?";

  return deletion.open ? (
    <div className="dialog" onClick={exitConfirmation}>
      <div className="container">
        <div className="content">{children}</div>
        <div className="buttons-container">
          <button className="accept" onClick={confirm}>
            Yes
          </button>
          <button className="cancel" onClick={exitConfirmation}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
