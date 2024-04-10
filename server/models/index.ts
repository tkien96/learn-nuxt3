import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const buildPrismaQueryOptions = (params: any, where: any) => {
    const queryOptions: any = {};
    if (params) {
        if (params.take) queryOptions.take = params.take;
        if (params.skip) queryOptions.skip = params.skip;
        if (params.select) queryOptions.select = params.select;
        if (params.orderBy) {
            queryOptions.orderBy = {
                [params.orderBy.field]: params.orderBy.derection || "asc",
            };
        }
    }
    if (where) queryOptions.where = where;
    return queryOptions;
};

