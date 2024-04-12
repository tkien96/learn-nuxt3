import { PrismaClient } from "@prisma/client";
import { IParams, IWhere } from "../types";

export const prisma = new PrismaClient({
    log: ["query"],
});

export const MCreate = async (model: string, data: object) => {
    try {
        return await (prisma as any)[model].create({
            data: data,
        });
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};

export const MRead = async (
    model: string,
    params?: IParams | null,
    where?: IWhere | null
) => {
    try {
        const options = buildPrismaQueryOptions(params, where)
        return await (prisma as any)[model].findMany(options);
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};

export const MReadUnique = async(
    model: string,
    params: IParams,
    where: IWhere
) => {
    const options = buildPrismaQueryOptions(params, where)
    return await (prisma as any)[model].findUnique(options);
}

export const MUpdate = async (model: string, id: number, data: object) => {
    try {
        return await (prisma as any)[model].update({
            where: { id: id },
            data: data,
        });
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};

export const MDelete = async (model: string, id: number) => {
    try {
        return await (prisma as any)[model].delete({
            where: { id: id },
        });
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};

export const buildPrismaQueryOptions = (params?: IParams | null, where?: IWhere | null) => {
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
    if (where) queryOptions.where = where;
    return queryOptions;
};