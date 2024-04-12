import { MDelete, MRead } from "~/server/models"

export default defineEventHandler(async(event) => {
    try {
        const id = parseInt(event.context.params!.id)
        if(!id) sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params !' }))
        const checkUserExists = await MRead('users', { select: ['id'] }, { where: { id: id } })
        if(isEmptyObject(checkUserExists)) return sendError(event, createError({ statusCode: 400, statusMessage: 'User not exists !' }))
        if(await MDelete('users', id)) return { status: 200, message: 'Deleted !' }
    } catch (error) {
        console.error("Error: ", error)
        throw error
    }   
})