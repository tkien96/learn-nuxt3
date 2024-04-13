export const isEmptyObject = (object: object | null): boolean => {
    if(object === null) return true
    return Object.keys(object).length === 0;
};

export const buildQueryOptions = (query: object, type: 'AND' | 'OR' | 'NOT') => {
    try {
        const flag = Object.keys(query).length === 1 ? true : false
        let queryOptions: any = flag ? {} : [],
            result = { where: {} };
        for (const [key, value] of Object.entries(query)) {
            if (key.startsWith("#")) {
                flag ? queryOptions = { ...queryOptions, ...{ [key.slice(1)]: parseInt(value) } } : queryOptions.push({ [key.slice(1)]: parseInt(value) });
            } else if (key.startsWith("_")) {
                flag ? queryOptions = { ...queryOptions, ...{ [key.slice(1)]: value } } : queryOptions.push({ [key.slice(1)]: value });
            } else {
                flag ? queryOptions = { ...queryOptions, ...{ [key]: { contains: `%${value}%` } } } : queryOptions.push({ [key]: { contains: `%${value}%` } });
            }
        }
        result.where = (flag ? queryOptions : { [type]: queryOptions })
        return result;
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};
