import { buildPrismaQueryOptions, prisma } from "../models";
import { IParams, IWhere } from "../types";

export const getData = async (table: string, params?: IParams | null, where?: IWhere | null) => {
    try {
        const queryOptions: any = await buildPrismaQueryOptions(params, where);
        return await (prisma as any)[table].findMany(queryOptions);
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}