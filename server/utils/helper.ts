export const isEmptyObject = (object: object): boolean => {
    return Object.keys(object).length === 0;
};

export const buildQueryOptions = (query: object) => {
    try {
        const flag = Object.keys(query).length === 1 ? true : false
        let queryOptions: any = flag ? {} : [];
        for (const [key, value] of Object.entries(query)) {
            if (key.startsWith("#")) {
                flag ? queryOptions = { ...queryOptions, ...{ [key.slice(1)]: parseInt(value) } } : queryOptions.push({ [key.slice(1)]: parseInt(value) });
            } else if (key.startsWith("_")) {
                flag ? queryOptions = { ...queryOptions, ...{ [key.slice(1)]: value } } : queryOptions.push({ [key.slice(1)]: value });
            } else {
                flag ? queryOptions = { ...queryOptions, ...{ [key]: { contains: `%${value}%` } } } : queryOptions.push({ [key]: { contains: `%${value}%` } });
            }
        }
        return queryOptions;
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};
