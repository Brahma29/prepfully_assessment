export const dateFormatter = (value) => {
    return value.toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    })
}