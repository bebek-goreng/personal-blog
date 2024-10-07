import { v4 as uuid } from "uuid";

export function slug(text) {
    const newSlug = text.toLowerCase().trim().split(" ").join("-");

    return newSlug;
}