import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const requestPath = event.req.url;
    if (requestPath && !requestPath.startsWith("/api/auth", 9)) return;
    const authHeader = event.req.headers.authorization;
    if (!authHeader?.startsWith("Bearer "))
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized: Missing token",
        });
    const token = authHeader.split(" ")[1];
    try {
        const config = useRuntimeConfig();
        jwt.verify(token, config.jwtAccessSecret);
        return;
    } catch (error) {
        console.error("Error verifyling token: ", error);
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized: Invalid token",
        });
    }
});
