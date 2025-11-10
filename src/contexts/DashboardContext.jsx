import React, { createContext, useState, useContext } from "react";

const DashboardContext = createContext();

// central component for pinned items
export function DashboardProvider({ children }) {

    //global array 
    const [pinnedItems, SetPinnedItems] = useState([]);

    //add new pinned item
    const pinItem = (item) => {
        SetPinnedItems((prev) => {
            //prevent duplicate by id
            const alreadyPinned = prev.some((i) => i.id === item.id);

            if (alreadyPinned) return prev;
            return [...prev, item];
        });
    };

    //unpin by id
    const unpinItem = ({ id }) => {
        SetPinnedItems((prev) =>
            prev.filter((i) => !(i.id === id))
        );
    };

    //update position
    const updatePosition = (id, position) => {
        SetPinnedItems((prev) =>
        prev.map((i) => (i.id === id ? {...i, position} : i))
        );
    };

    return (
        <DashboardContext.Provider value={{ pinnedItems, pinItem, unpinItem, updatePosition }}>
            {children}
        </DashboardContext.Provider>
    );
}
export function useDashboard() {
    return useContext(DashboardContext);
}