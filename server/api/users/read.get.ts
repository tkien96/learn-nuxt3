import { getUsers } from "../../db/users"

export default defineEventHandler(async (event) => {
    try {
        const users = await getUsers({ phone: true })
        return {
            status: 200,
            data: users,
            message: 'Successfully !'
        }
    } catch (error) {
        console.error('Error: ', error)
        return createError({ statusCode: 500, statusMessage: "An error has occurred !" })
    }
    
})