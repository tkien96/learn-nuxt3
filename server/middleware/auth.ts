import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    const authHeader = event.req.headers.authorization
    if(!authHeader?.startsWith("Bearer ")) return createError({ statusCode: 401, statusMessage: 'Unauthorized: Missing token' })
    const token = authHeader.split(" ")[1]
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        return true
    } catch (error) {
        console.error('Error verifyling token: ', error)
        return createError({ statusCode: 401, statusMessage: 'Unauthorized: Invalid token' })    
    }
})
