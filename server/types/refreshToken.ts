export interface IRefreshToken {
    id?: number;
    user_id: number;
    token: string | null;
    created_at?: Date;
    updated_at?: Date;
}
