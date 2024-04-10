import { createRefreshToken, getRefreshTokenBy } from "~/server/models/refreshToken"
import { getUserBy } from "~/server/models/users"
import { IRefreshToken } from "~/server/types/refreshToken"
import { comparePassword } from "~/server/utils/bcrypt"
import { generateTokens } from "~/server/utils/jwt"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event),
            {  email, password } = body,
            msgError = 'Email or password is invalid !'

        if(!email || !password) return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
        const user = await getUserBy("email", email)
        if(!user) return sendError(event, createError({ statusCode: 400, statusMessage: msgError }))
        const _comparePassword = await comparePassword(password, user.password)
        if(!_comparePassword) return sendError(event, createError({ statusCode: 400, statusMessage: msgError }))
        const { accessToken, refreshToken } = await generateTokens(user)
        const checkRefreshToken = await getRefreshTokenBy('user_id', user.id)
        if(checkRefreshToken && checkRefreshToken.token !== refreshToken && checkRefreshToken.user_id !== user.id) {
            const dataRefreshToken:IRefreshToken = {
                token: refreshToken,
                user_id: user.id
            }
            await createRefreshToken(dataRefreshToken)
        }

        return {
            status: 200,
            data: {
                accessToken,
                refreshToken
            },
            messsage: 'Success !'
        }
    } catch (error) {
        console.log("Error: ", error)
        throw error
    }
})
