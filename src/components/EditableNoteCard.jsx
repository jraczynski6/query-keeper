import React, { useState } from "react";
import "./EditableNoteCard.css";

export default function EditableNoteCard({ note, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(note?.content?.text || "New note");

    const handleSave = () => {
        // Update parent state
        onUpdate(note.id, text);
        // Close edit mode
        setIsEditing(false);
    };

    const handleDelete = () => {
        onDelete(note.id);
    };

    return (
        <div className="mini-card note-card">
            {isEditing ? (
                <>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                    />
                    <div className="note-card-buttons">
                        <button className="save-btn" onClick={handleSave}>Save</button>
                        <button className="delete-btn" onClick={handleDelete}>Delete</button>
                    </div>
                </>
            ) : (
                <div
                    className="note-content"
                    onClick={() => setIsEditing(true)}
                >
                    {text}
                </div>

            )}
        </div>
    );
}
