import React, { useState } from "react";
import { OpenConfirmation, RemoveNote, RemoveTask } from "./useNotes";

export type Deletion = {
  open: boolean;
  noteId: number;
  taskId: number;
  type: "exclude_note" | "exclude_task";
};

export interface DeletionData {
  deletion: Deletion;
  openConfirmation: OpenConfirmation;
  confirm: () => void;
  exitConfirmation: () => void;
}

const useDeletion = (
  removeNote: RemoveNote,
  _removeTask: RemoveTask
): DeletionData => {
  const [deletion, setDeletion] = useState<Deletion>({} as Deletion);

  const openConfirmation: OpenConfirmation = (type, noteId, taskId) => {
    setDeletion({ open: true, noteId, taskId, type });
  };

  const exitConfirmation = () => {
    setDeletion({} as Deletion);
  };

  const confirm = () => {
    if (deletion.type === "exclude_note") {
      removeNote(deletion.noteId);
    } else {
      _removeTask(deletion.noteId, deletion.taskId);
    }
    exitConfirmation();
  };

  return {
    deletion,
    openConfirmation,
    confirm,
    exitConfirmation,
  };
};

export default useDeletion;
