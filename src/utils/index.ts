export const getFirstAuthor = (authors: string[] = [], defaultValue: string = '-') => {
    return authors.length > 0 ? authors[0] : defaultValue;
};

