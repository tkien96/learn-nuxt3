import prisma from "~/server/utils/db"

export default defineEventHandler(async (event) => {
    await prisma.users.findMany().then((result) => {
        return {
            status: 200,
            data: result,
            message: 'Successfully !'
        }
    }).catch((error) => {
        return createError({ status: 500, message: error.message })
    })
})