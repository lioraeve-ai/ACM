"use server";

import { getInitialsFromURL, type InitialsFromURLInput } from "@/ai/flows/initials-from-url";

export async function getInitialsAction(input: InitialsFromURLInput) {
    try {
        const result = await getInitialsFromURL(input);
        return result;
    } catch (error) {
        console.error("Error in getInitialsAction:", error);
        return { initials: "" };
    }
}
