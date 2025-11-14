export function createNoteCard(initialText = "New Note") {
    return {
        id: crypto.randomUUID(),
        type: "note",
        position: { x: 0.1, y: 0.1 }, // 10% from top-left
        content: { text: initialText },
    };
}


// TODO: cycle colors for notes.
// TODO: Add color selector for border