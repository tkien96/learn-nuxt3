import { IParams, IWhere } from ".";

export interface IUser {
    id?: number;
    name: string;
    phone: string;
    email: string;
    password?: string | null;
    address?: string | null;
    avatar?: string | null;
    created_at?: Date;
    updated_at?: Date | null;
}

export interface IUserParams extends IParams {}
export interface IUserWhere extends IWhere {}
