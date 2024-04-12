import { MCreate, MRead} from "~/server/models"
import { tranformerUser } from "~/server/models/users"
import { IUser } from "~/server/types/user"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { email, phone, name, password, repeat_password } = body
        if(!email || !phone || !name || !password || !repeat_password) return sendError(event, createError({ statusCode: 401, statusMessage: 'Invalid params' }))
        if(password !== repeat_password) return sendError(event, createError({ statusCode: 401, statusMessage: 'Password do not match !' }))
        const checkUnique = await MRead("users", { select: ['id'] }, {where: {OR: [{ email: email }, { phone: phone }]}});
        if (!isEmptyObject(checkUnique)) return sendError(event, createError({ statusCode: 400, statusMessage: "Email or Phone is exists !" }));
        delete body.repeat_password
        const userData: IUser = {...body}
        userData.password = await hashPassword(password)
        const user = await MCreate('users', userData)
        return { 
            status: 200,
            message: 'Register Successfully !',
            data: await tranformerUser(user)
        }
    } catch (error) {
        console.error("Error: ", error)
        throw error
    }
})