import { IUserParams, IUserWhere } from "~/server/types/user";
import { getUsers } from "../../models/users";
import { getData } from "~/server/utils/model";
import { buildQueryOptions, isEmptyObject } from "~/server/utils/helper";

export default defineEventHandler(async (event) => {
    try {
        const query: object = await getQuery(event),
            params: IUserParams = {},
            where: IUserWhere = {};
        if (!isEmptyObject(query)) {
            where.AND = buildQueryOptions(query);
            params.select = ['id', 'name', 'phone', 'email']
            params.orderBy = { field: 'id', direction: 'desc' }
        }
        const users = await getData('users', { ...params }, { ...where });
        return {
            status: 200,
            data: users,
            message: "Successfully!",
        };
    } catch (error) {
        console.error("Error: ", error);
        return createError({
            statusCode: 500,
            statusMessage: "An error has occurred !",
        });
    }
});
