import prisma from ".";
import { IUser } from "../types/user";
import { hashPassword } from "~/server/utils/bcrypt";

export const getUsers = async (
    params?: Object,
    where?: Object
) => {
    try {
        return await prisma.users.findMany();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const createUser = async (data: IUser) => {
    try {
        const dataUser = {
            ...data,
            password: await hashPassword(data.password),
        };
        return await prisma.users.create({
            data: dataUser,
        });
    } catch (error) {
        console.error("Error create user", error);
        throw error;
    }
};

export const getUserByEmail = async (email: any) => {
    try {
        return await prisma.users.findUnique({
            where: { email: email }
        });
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error
    }
};
