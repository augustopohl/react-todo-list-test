import React from "react";
import { FiCheckSquare } from "react-icons/fi";
import { Note, OpenConfirmation } from "../../hooks/useNotes";
import "../../styles/notelist.scss";
import NoteComponent from "../Note/Note";

export interface NotesListProps {
  notes: Note[];
  addNewNote: (title: string) => void;
  editing?: boolean;
  openConfirmation: OpenConfirmation;
  clickEdit: (id: number) => void;
}
export default function NotesList({
  notes,
  addNewNote,
  openConfirmation,
  clickEdit,
  editing,
}: NotesListProps) {
  const [newTitle, setNewTitle] = React.useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    addNewNote(newTitle);
    setNewTitle("");
  }
  return (
    <>
      <section className="task-list container">
        <header>
          <h2>My notes</h2>

          <form onSubmit={handleSubmit} className="input-group">
            <input
              type="text"
              placeholder="Add a new note"
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
            />
            <button
              disabled={newTitle === ""}
              type="submit"
            >
              <FiCheckSquare size={16} color="#fff" />
            </button>
          </form>
        </header>

        <main>
          {notes.map((note, index) => {
            return (
              <NoteComponent
                index={index}
                key={note.id}
                {...note}
                editing={Boolean(editing)}
                openConfirmation={openConfirmation}
                clickEdit={clickEdit}
              />
            );
          })}
        </main>
      </section>
    </>
  );
}
