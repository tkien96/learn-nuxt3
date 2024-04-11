import { prisma, buildPrismaQueryOptions } from ".";
import { IUser, IUserParams, IUserWhere } from "../types/user";
import { hashPassword } from "~/server/utils/bcrypt";

export const getUsers = async (params?: IUserParams | null, where?: IUserWhere | null) => {
    try {
        const queryOptions: any = await buildPrismaQueryOptions(params, where);
        const users = await prisma.users.findMany(queryOptions);
        return tranformerUser(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const getUserBy = async (
    key: string,
    value: any
) => {
    try {
        const whereCondition: any = {};
        whereCondition[key] = value;
        return await prisma.users.findUnique({
            where: whereCondition,
        });
    } catch (error) {
        console.error(`Error fetching user by ${key}:`, error);
        throw error;
    }
};

export const getUserTranformerBy = async (
    key: string,
    value: string
) => {
    try {
        const whereCondition: any = {};
        whereCondition[key] = value;
        const user = await prisma.users.findUnique({
            where: whereCondition,
        });
        return tranformerUser(user)
    } catch (error) {
        console.error(`Error fetching user by ${key}:`, error);
        throw error;
    }
};

export const createUser = async (data: IUser) => {
    try {
        const { password } = data;
        if(password == null) return false;
        const dataUser = {
            ...data,
            password: await hashPassword(password),
        };
        const user = await prisma.users.create({
            data: dataUser,
        });
        return tranformerUser(user);
    } catch (error) {
        console.error("Error create user", error);
        throw error;
    }
};

export const updateUser = async (idUser: number, dataUser: IUser[]) => {
    try {
        const user = await prisma.users.update({
            where: { id: idUser },
            data: dataUser
        });
        return tranformerUser(user);
    } catch (error) {
        console.error("Error create user", error);
        throw error;
    }
};

export const tranformerUser = async (data: IUser | IUser[] | null) => {
    if (data === null) return null;
    return Array.isArray(data)
        ? await data.map((u) => ({
              user_id: u.id,
              user_name: u.name,
              phone_number: u.phone,
              email: u.email,
              avatar: u.avatar,
              address: u.address,
              created_at: u.created_at,
              updated_at: u.updated_at,
          }))
        : await {
              user_id: data.id,
              user_name: data.name,
              phone_number: data.phone,
              email: data.email,
              avatar: data.avatar,
              address: data.address,
              created_at: data.created_at,
              updated_at: data.updated_at,
          };
};
