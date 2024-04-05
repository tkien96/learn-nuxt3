import { verify } from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    const authHeader = event.req.headers.authorization
    if(!authHeader?.startsWith("Bearer ")) return createError({ status: 401, message: 'Unauthorized: Missing token' })
    const token = authHeader.split(" ")[1]
    try {
        const decoded = verify(token, process.env.JWT_SECRET)
        // return event.next()
    } catch (error) {
        console.error('Error verifyling token: ', error)
        return createError({ status: 401, message: 'Unauthorized: Invalid token' })    
    }
})