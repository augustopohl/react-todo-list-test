import React, { useContext } from "react";
import { useState } from "react";
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { OpenConfirmation, Task } from "../../hooks/useNotes";
import "../../styles/note.scss";
import { NotesContext } from "../AppContextProvider/AppContextProvider";
import TaskComponent from "../Task/Task";

export interface NoteProps {
  id: number;
  index: number;
  title: string;
  tasks: Task[];
  editing: boolean;
}
const Note = ({ id, index, title, tasks, editing }: NoteProps) => {
  const { _addNewTask, clickEdit, openConfirmation } = useContext(NotesContext);

  return (
    <div className="note-container">
      <div className="title-container">
        <h2 className="title">
          {index + 1} - {title}
        </h2>
        <div>
          {!editing && (
            <button
              type="button"
              onClick={() => clickEdit?.(id)}
            >
              <FiEdit size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={() => openConfirmation?.("exclude_note", id, 0)}
          >
            <FiTrash size={16} />
          </button>
        </div>
      </div>
      <ul className="tasks-container">
        {tasks.map((task, index) => {
          return (
            <TaskComponent
              key={index}
              noteId={id}
              {...task}
              editing={editing}
            />
          );
        })}
        {editing && (
          <button onClick={() => _addNewTask(id, "")} className="add-task">
            <FiPlus size={16} /> Add new task
          </button>
        )}
      </ul>
    </div>
  );
};

export default Note;
