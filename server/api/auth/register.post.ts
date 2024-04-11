import { createUser } from "~/server/models/users"
import { IUser } from "~/server/types/user"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { email, phone, name, password, repeat_password } = body
        if(!email || !phone || !name || !password) return sendError(event, createError({ statusCode: 401, statusMessage: 'Invalid params' }))
        if(password !== repeat_password) return sendError(event, createError({ statusCode: 401, statusMessage: 'Password do not match !' }))
        const userData: IUser = {...body}
        const user = await createUser(userData)
        return { 
            status: 200,
            message: 'Register Successfully !',
            data: user,
        }
    } catch (error) {
        console.error("Error: ", error)
        throw error
    }
})
