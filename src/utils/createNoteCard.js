export function createNoteCard(initialText = "New Note") {
    return {
        id: crypto.randomUUID(),
        type: "note",
        position: { x: 100, y: 100 },
        content: {
            text: initialText,
        },
    };
}