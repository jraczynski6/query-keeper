

export function createAgent(overrides = {}) { //override default
    return {
        id: crypto.randomUUID(),
        firstName: "Jane",
        lastName: "Doe",
        agency: "Best Agent Agency",
        email: "janedoe@email.com",
        website: "janedoe.com",
        twitter: "@janedoe",
        instagram: "@janedoe_",
        notes: "This agent prefers fantasy",
        ...overrides
    };
}