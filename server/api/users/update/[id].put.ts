import { getUsers, getUserBy, updateUser } from "~/server/models/users"
import { IUserParams, IUserWhere } from "~/server/types/user"

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params!.id), 
            data = await readBody(event),
            { email, phone } = data
        
        if(!id || !data) return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params !' }))
        const checkUserExists = await getUserBy('id', id)
        if(!checkUserExists) return sendError(event, createError({ statusCode: 400, statusMessage: 'User not exists !' }))
        const user = await updateUser(id, data)
        return {
            status: 200,
            data: user,
            message: 'Update Successfully !'
        }
    } catch (error) {
        console.error('Error: ', error)
        return createError({ statusCode: 500, statusMessage: "An error has occurred !" })
    }
})
