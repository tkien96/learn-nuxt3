import jwt from "jsonwebtoken";
import { IUser } from "../types/user";
import { tranformerUser } from "../models/users";

const generateAccessToken = (user: IUser) => {
    const config = useRuntimeConfig();

    return jwt.sign({ ...tranformerUser(user) }, config.jwtAccessSecret, {
        expiresIn: "24h",
    });
};

const generateRefreshToken = (user: IUser) => {
    const config = useRuntimeConfig();
    return jwt.sign({ ...tranformerUser(user) }, config.jwtRefreshSecret, {
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

export const generateTokens = (user: IUser | null) => {
    const accessToken = user === null ? null : generateAccessToken(user);
    const refreshToken = user === null ? null : generateRefreshToken(user);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
};
