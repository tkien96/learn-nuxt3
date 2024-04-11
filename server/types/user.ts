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
    skip?: number | null;
    take?: number | null;
    select?: string[] | null;
    orderBy?: { field: string; direction?: "asc" | "desc" } | null;
}

type WhereCondition<T> = T & {
    AND?: WhereCondition<T>[];
    OR?: WhereCondition<T>[];
    NOT?: WhereCondition<T>;
};

export interface IParamsUserWhere {
    id?: number;
    name?: string | null;
    phone?: string | null;
    email?: string | null;
    password?: string | null;
    address?: string | null;
    avatar?: string | null;
    created_at?: Date;
    updated_at?: Date | null;
}

export interface IUserWhere {
    AND?: WhereCondition<IUserWhere>[] | [];
    OR?: WhereCondition<IUserWhere>[] | [];
    NOT?: WhereCondition<IUserWhere> | null;
}
