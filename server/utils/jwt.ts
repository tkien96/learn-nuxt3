import jwt from "jsonwebtoken";
import { IUser } from "../types/user";

const generateAccessToken = (user: IUser) => {
    const config = useRuntimeConfig();

    return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
        expiresIn: "24h",
    });
};

const generateRefreshToken = (user: IUser) => {
    const config = useRuntimeConfig();

    return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
        expiresIn: "4h",
    });
};

export const decodeRefreshToken = (token: String) => {
    const config = useRuntimeConfig();

    try {
        return jwt.verify(token, config.jwtRefreshSecret);
    } catch (error) {
        return null;
    }
};

export const decodeAccessToken = (token: String) => {
    const config = useRuntimeConfig();

    try {
        return jwt.verify(token, config.jwtAccessSecret);
    } catch (error) {
        return null;
    }
};

export const generateTokens = (user: IUser) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
};
