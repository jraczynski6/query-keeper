import React, { createContext, useState, useContext } from "react";

const DashboardContext = createContext();

// central component for pinned items
export function DashboardProvider({ children }) {

    //global array 
    const [pinnedItems, setPinnedItems] = useState(() => {
        const saved = localStorage.getItem("dashboardPinnedItems");
        return saved ? JSON.parse(saved) : [];
    });

    const pinItem = (item) => {
        setPinnedItems((prev) => {
            if (prev.some((i) => i.id === item.id)) return prev;
            const newItems = [...prev, item];
            savePinnedItems(newItems);
            return newItems;
        });
    };

    //save pinned items
    const savePinnedItems = (items) => {
        setPinnedItems(items);
        localStorage.setItem("dashboardPinnedItems", JSON.stringify(items));
    };

    //unpin by id
    const unpinItem = ({ id }) => {
        setPinnedItems((prev) => {
            const newItems = prev.filter((i) => i.id !== id);
            localStorage.setItem("dashboardPinnedItems", JSON.stringify(newItems));
            return newItems;
        });
    };

    // Update position
    const updatePosition = (id, position) => {
        setPinnedItems((prev) => {
            const newItems = prev.map((i) =>
                i.id === id ? { ...i, position } : i
            );
            localStorage.setItem("dashboardPinnedItems", JSON.stringify(newItems));
            return newItems;
        });
    };

    // Update note content
    const updateNoteContent = (id, text) => {
        setPinnedItems((prev) => {
            const newItems = prev.map((item) =>
                item.id === id
                    ? { ...item, content: { ...item.content, text } }
                    : item
            );
            localStorage.setItem("dashboardPinnedItems", JSON.stringify(newItems));
            return newItems;
        });
    };

    //clear all pinned
    const clearDashboard = () => {
        setPinnedItems([]);
        localStorage.removeItem("dashboardPinnedItems");
    };

    return (
        <DashboardContext.Provider value={{
            pinnedItems,
            pinItem,
            unpinItem,
            updatePosition,
            updateNoteContent,
            clearDashboard,
        }}>
            {children}
        </DashboardContext.Provider>
    );
}
export function useDashboard() {
    return useContext(DashboardContext);
}