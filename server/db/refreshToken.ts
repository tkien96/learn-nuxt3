import prisma from ".";
import { IRefreshToken } from "../types/refreshToken";

export const createRefreshToken = async (refreshToken: IRefreshToken) => {
    try {
        return await prisma.refresh_token.create({ data: refreshToken })
    } catch (error) {
        console.error("Error: ", error)
        throw error
    }
}
