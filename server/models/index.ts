import { PrismaClient } from "@prisma/client";
import { IUserParams, IUserWhere } from "../types/user";

export const prisma = new PrismaClient({
    log: ['query']
});

export const buildPrismaQueryOptions = (params?: IUserParams | null, where?: IUserWhere | null) => {
    const queryOptions: any = [];
    if (params) {
        if (params.take) queryOptions.take = params.take;
        if (params.skip) queryOptions.skip = params.skip;
        if (params.select) {
            queryOptions.select = [];
            params.select.map(item => {
                queryOptions.select[item] = true
            })
        }
        if (params.orderBy) {
            queryOptions.orderBy = {
                [params.orderBy.field]: params.orderBy.direction || "asc",
            };
        }
    }
    console.log(queryOptions)
    if (where) queryOptions.where = where;
    return queryOptions;
};

