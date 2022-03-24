import React, { createContext } from "react";
import useDeletion, { DeletionData } from "../../hooks/useDeletion";
import { useNotes, NotesData } from "../../hooks/useNotes";

export interface NotesContextData extends NotesData, DeletionData {}
export const NotesContext = createContext<NotesContextData>(
  {} as NotesContextData
);

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const notes = useNotes();
  const deletion = useDeletion(notes.removeNote, notes._removeTask);

  return (
    <NotesContext.Provider value={{ ...notes, ...deletion }}>
      {children}
    </NotesContext.Provider>
  );
};

export default AppContextProvider;
