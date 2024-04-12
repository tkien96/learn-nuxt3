import { MRead, MUpdate } from "~/server/models";
import { tranformerUser } from "~/server/models/users";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params!.id),
            data = await readBody(event),
            { email, phone } = data;

        if (!id || !data) return sendError(event,  createError({ statusCode: 400, statusMessage: "Invalid params !" }));
        const checkUserExists = await MRead('users', { select: ['id'] }, { where: { id: id } }, 'unique');
        if (!checkUserExists) return sendError( event, createError({ statusCode: 400, statusMessage: "User not exists !" }));
        if (email || phone) {
            let query: object = {};
            if (email) query = { ...query, ...{ email: email } };
            if (phone) query = { ...query, ...{ phone: phone } };
            const checkUnique = await MRead("users", null, {where: { OR: [query] }});
            if (!isEmptyObject(checkUnique)) return sendError( event, createError({ statusCode: 400, statusMessage: "Email or Phone is exists !" }));
        }
        const user = await MUpdate('users', id, data);
        return { status: 200, data: await tranformerUser(user), message: "Update Successfully !", };
    } catch (error) {
        console.error("Error: ", error);
        throw error
    }
});
