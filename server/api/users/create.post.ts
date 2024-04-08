// import { getUsers, createUser } from "../../db/users"

// export default defineEventHandler(async (event) => {
//     const { email, phone, name } = await readBody(event)
//     if(!email) return createError({ status: 400, message: 'Email is required !' })
//     if(!phone) return createError({ status: 400, message: 'Phone is required !' })
//     if(!name) return createError({ status: 400, message: 'Name is required !' })

//     try {
//         const checkUserExists = await getUsers('id', {OR: [{ email: email }, { phone: phone }]})
//         if(checkUserExists) return createError({ status: 400, message: 'User already exists !' })

//         const user = await createUser({
//             email,
//             phone,
//             name
//         })
//         return {
//             status: 200,
//             data: user,
//             message: 'Successfully !'
//         }
//     } catch (error) {
//         console.error('Error:', error)
//         return createError({ status: 500, message: 'An error occurred !' })
//     }
// })