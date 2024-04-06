import prisma from "~/server/utils/db"

export default defineEventHandler(async (event) => {
    try {
        const users = await prisma.users.findMany({
            select: {
                phone: true,
                email: true,
                name: true
            }
        })
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