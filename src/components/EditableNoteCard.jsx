
import React, { useState } from "react";

export default function EditableNoteCard({onUpdate, note}) {
    //handle own edit state
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(Note.content.text);

    // save note
    const handleSave = () => {
        onUpdate(note.id, text);
        setIsEditing(false);
    };

    return (
        <div className="mini-card note-card">
            {isEditing ? (
                <>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    />
                    <button className="save-btn" onClick={handleSave}>Save</button>
                </>
            ) : (
                <p onClick={() => setIsEditing(true)}>{text}</p>
            )}
        </div>
    );
}