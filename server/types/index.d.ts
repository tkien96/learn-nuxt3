declare module 'bcrypt'
declare module 'jsonwebtoken'

export interface IParams {
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

export interface IWhere {
    AND?: WhereCondition<IWhere>[] | [];
    OR?: WhereCondition<IWhere>[] | [];
    NOT?: WhereCondition<IWhere> | null;
}