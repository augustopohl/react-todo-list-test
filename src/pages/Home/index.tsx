import { useContext } from "react";
import { NotesContext } from "../../components/AppContextProvider/AppContextProvider";
import { Header } from "../../components/Header/Header";
import NotesList from "../../components/NotesList/NotesList";

export default function Home() {
  const { notes, addNewNote, clickEdit, openConfirmation } =
    useContext(NotesContext);

  return (
    <>
      <Header />
      <NotesList
        addNewNote={addNewNote}
        notes={notes}
        openConfirmation={openConfirmation}
        clickEdit={clickEdit}
      />
    </>
  );
}
