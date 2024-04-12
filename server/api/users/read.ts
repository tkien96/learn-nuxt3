import { buildQueryOptions, isEmptyObject } from "~/server/utils/helper";
import { MRead } from "~/server/models";
import { tranformerUser } from "~/server/models/users";
import { IParams, IWhere } from "~/server/types";
import { IUser } from "~/server/types/user";

export default defineEventHandler(async (event) => {
    try {
        let query: any = await getQuery(event),
            params: IParams = { orderBy: { field: 'id', direction: 'desc' }},
            where: IWhere | undefined;

        if(query?.page) {
            const page: number = parseInt(query?.page),
                pageSize: number = parseInt(query?.page_size) || 10
            params.skip = page === 1 ? 0 : (page - 1) * pageSize;
            params.take = pageSize;
            delete query?.page
            delete query?.page_size
        }
        let users: IUser | IUser[];
        if (!isEmptyObject(query)) where = buildQueryOptions(query);
        users = await MRead('users', params, where);
        
        return { status: 200, data: await tranformerUser(users), message: "Successfully!" };
    } catch (error) {
        console.error("Error: ", error);
        throw error
    }
});
