import React, { createContext, useState, useContext } from "react";

const DashboardContext = createContext();

// central component for pinned items
export function DashboardProvider({ children }) {

    //global array 
    const [pinnedItems, setPinnedItems] = useState([]);

    //add new pinned item
    const pinItem = (item) => {
        setPinnedItems((prev) => {
            //prevent duplicate by id
            const alreadyPinned = prev.some((i) => i.id === item.id);

            if (alreadyPinned) return prev;
            return [...prev, item];
        });
    };

    //unpin by id
    const unpinItem = ({ id }) => {
        setPinnedItems((prev) =>
            prev.filter((i) => !(i.id === id))
        );
    };

    //update position
    const updatePosition = (id, position) => {
        setPinnedItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, position } : i))
        );
    };

    const updateNoteContent = (id, text) => {
        setPinnedItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, content: { ...item.content, text } } // merge updated text
                    : item
            )
        );
    };

    return (
        <DashboardContext.Provider value={{
            pinnedItems,
            pinItem,
            unpinItem,
            updatePosition,
            updateNoteContent
        }}>
            {children}
        </DashboardContext.Provider>
    );
}
export function useDashboard() {
    return useContext(DashboardContext);
}