const KEY = 'zen_dash_tasks';

export const storage = {
    save: (tasks) => localStorage.setItem(KEY, JSON.stringify(tasks)),
    get: () => JSON.parse(localStorage.getItem(KEY)) || []
};