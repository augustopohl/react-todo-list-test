import { useContext } from "react";
import { NotesContext } from "../../components/AppContextProvider/AppContextProvider";
import { Header } from "../../components/Header/Header";
import NoteComponent from "../../components/Note/Note";
import "../../styles/editnote.scss";
import { Redirect } from "react-router-dom";

export interface EditNoteProps {
  id: number;
}
export default function EditNote({ id }: EditNoteProps) {
  const { _saveChanges, _revertChanges, _revertLastChange, editingNotes } = 
    useContext(NotesContext);

  if (!id) return <Redirect to="/" />;

  const noteIndex = editingNotes.findIndex((note) => note.id === id);
  const note = editingNotes.find((note) => note.id == id);

  if (!note) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <Header />
        <section className="task-list container">
          <header>
            <h2>My notes</h2>
          </header>
          <main>
            <div className="buttons-container">
              <button type="button" onClick={_saveChanges}>
                Save all changes
              </button>
              <button type="button" onClick={_revertChanges}>
                Revert all changes
              </button>
              <button type="button" onClick={_revertLastChange}>
                Undo last change
              </button>
              <button type="button">Redo last change</button>
            </div>
            <NoteComponent
              index={noteIndex + 1}
              id={note.id}
              title={note.title}
              tasks={note.tasks}
              editing
            />
          </main>
        </section>
      </>
    );
  }
}
