const STORAGE_KEY = 'zen_tasks';

export const storage = {
    save: (tasks) => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)),
    get: () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
};