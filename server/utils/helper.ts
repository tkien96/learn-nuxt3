export const isEmptyObject = (object: object): boolean => {
    return Object.keys(object).length === 0;
};

export const buildQueryOptions = (query: object) => {
    try {
        let queryOptions: any = [];
        for (const [key, value] of Object.entries(query)) {
            if (key.startsWith("_")) {
                queryOptions.push({ [key.slice(1)]: Number(value) });
            } else {
                queryOptions.push({ [key]: { contains: `%${value}%` } });
            }
        }
        return queryOptions;
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};
