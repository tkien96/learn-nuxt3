import { getUserByEmail } from "~/server/db/users"
import { comparePassword } from "~/server/utils/bcrypt"
import { generateTokens } from "~/server/utils/jwt"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const {  email, password } = body
        if(!email || !password) return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
        const user = await getUserByEmail(email)
        return user;
        // if(!user) return sendError(event, createError({ statusCode: 400, statusMessage: 'Email or password is invalid' }))
        // if(!comparePassword(password, user.password)) return sendError(event, createError({ statusCode: 400, statusMessage: 'Email or password is invalid' }))
        // const { accessToken, refreshToken } = await generateTokens(user)
        // return {
        //     data: {
        //         accessToken,
        //         refreshToken
        //     }
        // }
    } catch (error) {
        console.log("Error: ", error)
        throw error
    }
})
