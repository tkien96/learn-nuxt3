import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()


export default defineEventHandler(async (event) => {
    const { email, phone, name } = await readBody(event)
    if(!email) createError({ status: 401, message: 'Email is required !' })
    if(!phone) createError({ status: 401, message: 'Phone is required !' })
    if(!name) createError({ status: 401, message: 'Name is required !' })

    const user = await prisma.users.create({
        data: {
            email: email,
            phone: phone,
            name: name
        }
    }).then((result) => {
        return {
            status: 200,
            data: result,
            message: 'Successfully !'
        }
    }).catch((error) => {
        return createError({ status: 500, message: error.message })
    })
})