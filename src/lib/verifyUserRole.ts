const UserRole: { [key: string]: string[] } = {
    "SUPER_ADMIN": ['USERS', 'POSTS', 'TAGS', 'CATEGORIES', 'EVENTS', 'COMMENTS', 'CATEGORIES'],
    "ADMINISTRATOR": ['USERS', 'POSTS', 'TAGS', 'CATEGORIES', 'EVENTS', 'COMMENTS', 'CATEGORIES'],
    "EDITOR": ['POSTS', 'TAGS', 'CATEGORIES', 'EVENTS', 'COMMENTS', 'CATEGORIES'],
    "AUTHOR": ['POSTS', 'TAGS', 'CATEGORIES', 'COMMENTS', 'CATEGORIES'],
    "CONTRIBUTOR": ['TAGS', 'CATEGORIES', 'COMMENTS'],
    "SUBSCRIBER": ['COMMENTS'],
};


export const verifyUserRole = (role: string, action: string): boolean => {
    const actions = UserRole[role];
    if (!actions) {
        return false;
    }
    return actions.includes(action.toUpperCase());
}