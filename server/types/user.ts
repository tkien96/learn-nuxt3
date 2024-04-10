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

export interface IUserParams {
    skip?: number;
    take?: number;
    select?: string[];
    orderBy?: { field: string; derection?: "asc" | "desc" };
}

type WhereCondition<T> = T & {
    AND?: WhereCondition<T>[];
    OR?: WhereCondition<T>[];
    NOT?: WhereCondition<T>;
};

export interface IUserWhere extends IUser {
    AND?: WhereCondition<IUserWhere>[];
    OR?: WhereCondition<IUserWhere>[];
    NOT?: WhereCondition<IUserWhere>;
}
