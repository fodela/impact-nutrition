const UserRole: { [key: string]: string[] } = {
    "SUPER_ADMIN": ['USERS', 'POSTS', 'TAGS', 'CATEGORIES', 'EVENTS', 'COMMENTS'],
    "ADMINISTRATOR": ['POST', 'TAGS', 'CATEGORIES', 'EVENTS', 'COMMENTS'],
    "EDITOR": ['POST', 'TAGS', 'CATEGORIES', 'EVENTS', 'COMMENTS'],
    "AUTHOR": ['POST', 'TAGS', 'CATEGORIES', 'COMMENTS'],
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