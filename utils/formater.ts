export const formatViews = (views: number) => {
    if (views < 1000) return views.toString();
    if (views < 1_000_000) return (views / 1000).toFixed(1).replace(".0", "") + "K";
    return (views / 1_000_000).toFixed(1).replace(".0", "") + "M";
};

export const formatDate = (date: Date, lang: string) =>
    new Intl.DateTimeFormat(lang, {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date)