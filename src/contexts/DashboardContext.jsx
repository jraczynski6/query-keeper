import React, { createContext, useState, useContext } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {

    // state for pinned items
    const [pinnedItems, setPinnedItems] = useState([]);

    // pin item
    const pinItem = (item) => {
        setPinnedItems(prevItems => {
            return [...prevItems, item]
        });
    };

    // TODO: add unpin logic

    return (
        <DashboardContext.Provider value={{ pinnedItems, pinItem}}>
            {children}
        </DashboardContext.Provider>
    );
}
export function useDashboard() {
    return useContext(DashboardContext);
}