export const dateFormatter = (value) => {
    return value.toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    })
}

export const customFormatLongDate = ({ date, locale }) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(locale, options);
};