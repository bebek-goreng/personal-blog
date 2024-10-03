export function slug(text) {
    return text
        .toLowerCase()
        .trim()
        .split(" ")
        .join("-")
}