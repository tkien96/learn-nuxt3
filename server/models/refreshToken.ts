import { MCreate } from ".";
import { IRefreshToken } from "../types/refreshToken";

export const createRefreshToken = async (refreshToken: IRefreshToken | null) => {
    try {
        if(refreshToken == null) return null;
        return await  MCreate('refresh_token', refreshToken)
    } catch (error) {
        console.error("Error: ", error)
        throw error
    }
}
