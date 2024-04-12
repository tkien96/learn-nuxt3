declare module 'bcrypt'
declare module 'jsonwebtoken'
export interface IParams {
    skip?: number | null;
    take?: number | null;
    select?: string[] | null;
    orderBy?: { field: string; direction?: "asc" | "desc" } | null;
}

export interface IWhere {
    where: { [key: string]: any } | { [key: string]: any }[]
}
