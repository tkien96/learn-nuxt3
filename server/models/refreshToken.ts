import { prisma } from ".";
import { IRefreshToken } from "../types/refreshToken";

export const createRefreshToken = async (refreshToken: IRefreshToken) => {
    try {
        if(refreshToken == null) return null;
        return await prisma.refresh_token.create({ data: refreshToken })
    } catch (error) {
        console.error("Error: ", error)
        throw error
    }
}

export const getRefreshTokenBy = async (
    key: string,
    value: any
) => {
    try {
        const whereCondition: any = {};
        whereCondition[key] = value;
        return await prisma.refresh_token.findUnique({
            where: whereCondition,
        });
    } catch (error) {
        console.error(`Error fetching user by ${key}:`, error);
        throw error;
    }
};