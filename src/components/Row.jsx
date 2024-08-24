import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTrash, FaHandPaper, FaPlus, FaSave, FaEllipsisV } from 'react-icons/fa';
import '../styles/NoteList.css';
import '../styles/Button.css';

const Row = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);
  const [showButtons, setShowButtons] = useState(false);

  const handleDelete = () => {
    props.onDelete(props.id);
    toast.error('Row Deleted Successfully');
  };

  const handleCheck = () => {
    props.onCheck(props.id);
  };

  const handleHold = () => {
    props.onHold(props.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    props.onSave(props.id, editedTitle, editedContent);
    setIsEditing(false);
  };

  const toggleButtons = () => {
    setShowButtons((prevState) => !prevState);
  };

  return (
    <tr
      className={`row ${props.checked ? 'row-checked' : ''} ${props.held ? 'row-held' : ''} ${props.isDragging ? 'row-dragging' : ''}`}
      draggable
      onDragStart={(e) => props.onDragStart(e, props.index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => props.onDrop(e, props.index)}
    >
      <td className="row-data">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="row-edit-title"
          />
        ) : (
          props.title
        )}
      </td>
      <td className="row-data">
        <div className="row-content-container">
          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="row-edit-content"
            />
          ) : (
            <p className="row-content-text">{props.content}</p>
          )}
          <button onClick={toggleButtons} className="row-ellipse-btn">
            <FaEllipsisV />
          </button>
          {showButtons && (
            <div className={`Row-btns ${showButtons ? 'show' : ''}`}>
              <button onClick={handleDelete} className="Item-btn Item-delete-btn">
                <FaTrash />
              </button>
              <button onClick={handleCheck} className="Item-btn Item-checked-btn">
                <FaCheckCircle />
              </button>
              <button onClick={handleHold} className="Item-btn Item-held-btn">
                <FaHandPaper />
              </button>
              {isEditing ? (
                <button onClick={handleSave} className="Item-btn Item-save-btn">
                  <FaSave />
                </button>
              ) : (
                <button onClick={handleEdit} className="Item-btn Item-edit-btn">
                  <FaPlus />
                </button>
              )}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default Row;
