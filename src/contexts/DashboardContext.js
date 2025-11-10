import React, { createContext, useState, useContext } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {

    // state for pinned items
    const [pinnedItems, SetPinnedItems] = useState([]);

    // pin item
    const pinItem = (item) => {
        if (!pinnedItems) {
            SetPinnedItems([...pinnedItems, item])
        }
    }
};