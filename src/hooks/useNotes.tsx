import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}
export interface Note {
  id: number;
  title: string;
  tasks: Task[];
}

export interface Change {
  noteId: number;
  taskId?: number;
  type:
  | "complete"
  | "create_task"
  | "remove_task"
  | "edit_task_name"
  | "edit_note_name";
  prevValue?: boolean | string;
  newValue?: boolean | string;
}
export type AddNewNote = (title: string) => void;
export type RemoveNote = (noteId: number) => void;
export type EditNoteTitle = (
  id: number,
  title: string,
  not_add?: boolean
) => void;
export type AddNewTask = (
  noteId: number,
  title: string,
  not_add?: boolean
) => void;
export type EditTaskTitle = (
  noteId: number,
  taskId: number,
  title: string,
  not_add?: boolean
) => void;
export type RemoveTask = (
  noteId: number,
  taskId: number,
  not_add?: boolean
) => void;
export type ToggleTaskComplete = (
  noteId: number,
  taskId: number,
  not_add?: boolean
) => void;
export type ClickEdit = (noteId: number) => void;

export interface NotesData {
  /**
   * Functions started with _ are functions available ONLY in editing mode
   * They only set the 'editingNotes' and the 'changes' states
   *
   */
  notes: Note[];
  editingNotes: Note[];
  addNewNote: AddNewNote;
  removeNote: RemoveNote;
  clickEdit: ClickEdit;
  _editNoteTitle: EditNoteTitle;
  _addNewTask: AddNewTask;
  _editTaskTitle: EditTaskTitle;
  _removeTask: RemoveTask;
  _toggleTaskComplete: ToggleTaskComplete;
  _saveChanges: () => void;
  _revertChanges: () => void;
  _revertLastChange: () => void;
}

export type OpenConfirmation = (
  type: "exclude_note" | "exclude_task",
  noteId: number,
  taskId: number
) => void;

export function useNotes(): NotesData {
  const history = useHistory();
  const [notes, setNotes] = useState<Note[]>([]); // State to store notes
  const [editingNotes, setEditingNotes] = useState<Note[]>([]); // State to store changed notes
  const [changes, setChanges] = useState<Change[]>([]); // State to store changes

  console.log(changes);

  useEffect(() => {
    const notes = localStorage.getItem("notesInfo");
    if (notes) setNotes(JSON.parse(notes));
  }, []);

  useEffect(() => {
    if (notes) setEditingNotes(JSON.parse(JSON.stringify(notes)));
  }, [notes]);

  // useEffect(() => {
  //   const changes = localStorage.getItem("changesInfo");
  //   if (changes) setChanges(JSON.parse(changes));
  // }, []);

  /**
   *  Handle redirect to home page
   */
  function _exitEdition() {
    history.push("/");
  }

  /**
   * Save all changes and exit editing mode
   */
  function _saveChanges() {
    setNotes(editingNotes);
    setChanges([]);
    _exitEdition();
  }

  /**
   * Revert all changes and exit editing mode
   */
  function _revertChanges() {
    setEditingNotes(notes);
    setChanges([]);
    _exitEdition();
  }

  /**
   * Revert last change of the list
   */
  function _revertLastChange() {
    const newChanges = [...changes];
    const lastChange = newChanges.splice(changes.length - 1, 1)[0];
    const { noteId, taskId, type, prevValue, newValue } = lastChange;

    console.log(lastChange);

    switch (type) {
      case "complete":
        if (taskId) _toggleTaskComplete(noteId, taskId, true);
        break;
      case "create_task":
        if (taskId) _removeTask(noteId, taskId, true);
        break;
      case "remove_task":
        if (taskId) _addNewTask(noteId, prevValue as string, true);
        break;
      case "edit_task_name":
        if (taskId) _editTaskTitle(noteId, taskId, prevValue as string, true);
        break;
      case "edit_note_name":
        if (noteId) _editNoteTitle(noteId, newValue as string, true);
        break;
    }
    setChanges(newChanges);

    // localStorage.setItem("changesInfo", JSON.stringify(newChanges));
  }

  /**
   * Add new Note
   * @param title New note title
   */
  function addNewNote(title: string) {
    const updatedNotes = [...notes];
    const newNote = {
      id: new Date().getTime(),
      title: title,
      tasks: [],
    };
    updatedNotes.push(newNote);
    setNotes(updatedNotes);

    localStorage.setItem("notesInfo", JSON.stringify(updatedNotes));
  }

  /**
   * Handle click edit Note
   * @param id
   */
  function clickEdit(id: number) {
    history.push("/edit/" + id);
  }

  /**
   * Edit note title
   * @param id Note id
   * @param title New note title
   */
  function _editNoteTitle(id: number, title: string, not_add?: boolean) {
    const updatedNotes = [...editingNotes];
    const productIndex = updatedNotes.findIndex((note) => note.id === id);
    const prevValue = updatedNotes[productIndex].title;
    const newNote = { ...updatedNotes[productIndex], title: title };
    updatedNotes[productIndex] = newNote;
    setEditingNotes(updatedNotes);

    localStorage.setItem("notesInfo", JSON.stringify(updatedNotes));

    if (!not_add) {
      const newChange: Change = {
        noteId: id,
        type: "edit_note_name",
        prevValue,
        newValue: title,
      };
      setChanges([...changes, newChange]);
    }
  }

  /**
   * Remove note
   * @param noteId Note id
   */
  function removeNote(noteId: number) {
    const updatedNotes = [...notes];
    const productIndex = updatedNotes.findIndex((note) => note.id === noteId);

    if (productIndex >= 0) {
      updatedNotes.splice(productIndex, 1);
      setNotes(updatedNotes);

      localStorage.setItem('notesInfo', JSON.stringify(updatedNotes))
      _exitEdition();
    }
  }

  /**
   * Handle toggle task
   * @param noteId
   * @param taskId
   */
  function _toggleTaskComplete(
    noteId: number,
    taskId: number,
    not_add?: boolean
  ) {
    const updatedNotes = [...editingNotes];
    const noteIndex = updatedNotes.findIndex((note) => note.id === noteId);
    const note = { ...updatedNotes[noteIndex] };
    const taskIndex = note.tasks.findIndex((task) => task.id === taskId);
    const task = { ...note.tasks[taskIndex] };
    task.isComplete = !task.isComplete;
    note.tasks[taskIndex] = task;
    updatedNotes[noteIndex] = note;
    setEditingNotes(updatedNotes);

    localStorage.setItem("notesInfo", JSON.stringify(updatedNotes));

    if (!not_add) {
      const newChange: Change = {
        noteId,
        taskId,
        type: "complete",
        prevValue: !task.isComplete,
        newValue: task.isComplete,
      };
      setChanges([...changes, newChange]);
    }
  }

  /**
   *
   * @param noteId Note id
   * @param title New task title
   */
  function _addNewTask(noteId: number, title: string, not_add?: boolean) {
    const updatedNotes = [...editingNotes];
    const productIndex = updatedNotes.findIndex((note) => note.id === noteId);
    const newTask = {
      id: new Date().getTime(),
      title: title,
      isComplete: false,
    };
    const newTasks = [...updatedNotes[productIndex].tasks];
    newTasks.push(newTask);
    updatedNotes[productIndex].tasks = newTasks;
    setEditingNotes(updatedNotes);

    localStorage.setItem("notesInfo", JSON.stringify(updatedNotes));

    if (!not_add) {
      const newChange: Change = {
        noteId,
        taskId: newTask.id,
        type: "create_task",
      };
      setChanges([...changes, newChange]);
    }
  }
  /**
   *
   * @param noteId Note id
   * @param taskId Task id
   */
  function _editTaskTitle(
    noteId: number,
    taskId: number,
    title: string,
    not_add?: boolean
  ) {
    const updatedNotes = [...editingNotes];
    const noteIndex = updatedNotes.findIndex((note) => note.id === noteId);
    const note = { ...updatedNotes[noteIndex] };
    const taskIndex = note.tasks.findIndex((task) => task.id === taskId);
    const task = { ...note.tasks[taskIndex] };
    const prevTitle = task.title;
    task.title = title;
    note.tasks[taskIndex] = task;
    updatedNotes[noteIndex] = note;
    setEditingNotes(updatedNotes);

    localStorage.setItem("notesInfo", JSON.stringify(updatedNotes));

    if (!not_add) {
      const newChange: Change = {
        noteId,
        taskId,
        type: "edit_task_name",
        prevValue: prevTitle,
        newValue: task.title,
      };
      setChanges([...changes, newChange]);

      localStorage.setItem("notesInfo", JSON.stringify(updatedNotes));

    }
  }

  /**
   *
   * @param noteId Note id
   * @param taskId Task id
   * @param not_add If should NOT add this change to the list of changes
   */
  function _removeTask(noteId: number, taskId: number, not_add?: boolean) {
    console.log("removingTask");
    const updatedNotes = [...editingNotes];
    const noteIndex = updatedNotes.findIndex((note) => note.id === noteId);
    const note = { ...updatedNotes[noteIndex] };
    const taskIndex = note.tasks.findIndex((task) => task.id === taskId);
    const excluded = note.tasks.splice(taskIndex, 1);
    updatedNotes[noteIndex] = note;
    setEditingNotes(updatedNotes);

    localStorage.setItem("notesInfo", JSON.stringify(updatedNotes));

    if (!not_add) {
      const newChange: Change = {
        noteId,
        taskId,
        type: "remove_task",
        prevValue: excluded[0].title,
      };
      setChanges([...changes, newChange]);
    }
  }

  return {
    notes,
    editingNotes,
    addNewNote,
    removeNote,
    clickEdit,
    _editNoteTitle,
    _addNewTask,
    _editTaskTitle,
    _removeTask,
    _toggleTaskComplete,
    _saveChanges,
    _revertChanges,
    _revertLastChange,
  };
}
