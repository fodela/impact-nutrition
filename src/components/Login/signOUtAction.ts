// signOutAction.js
"use server";

import {signOut as authSignOut} from "../../../auth";

export async function signOutTo(redirectTo: string) {
    await authSignOut({redirectTo});
}

