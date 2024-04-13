import jwt from "jsonwebtoken";
import { IUser } from "../types/user";
import { tranformerUser } from "../models/users";
const generateAccessToken = async (user: IUser) => {
    const config = useRuntimeConfig(),
        tranfUser = await tranformerUser(user);
    return jwt.sign({ ...tranfUser }, config.jwtAccessSecret, {
        expiresIn: "24h",
    });
};
const generateRefreshToken = async (user: IUser) => {
    const config = useRuntimeConfig(),
        tranfUser = await tranformerUser(user);
    return jwt.sign({ ...tranfUser }, config.jwtRefreshSecret, {
        expiresIn: "4h",
    });
};
export const decodeRefreshToken = (token: string) => {
    const config = useRuntimeConfig();
    try {
        return jwt.verify(token, config.jwtRefreshSecret);
    } catch (error) {
        return null;
    }
};
export const decodeAccessToken = (token: string) => {
    const config = useRuntimeConfig();
    try {
        return jwt.verify(token, config.jwtAccessSecret);
    } catch (error) {
        return null;
    }
};
export const generateTokens = async (user: IUser | null) => {
    const accessToken = user === null ? null : await generateAccessToken(user);
    const refreshToken = user === null ? null : await generateRefreshToken(user);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
};
