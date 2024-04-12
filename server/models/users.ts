import { IUser } from "../types/user";

export const tranformerUser = async (data: IUser | IUser[] | null) => {
    if (data === null) return null;
    return Array.isArray(data)
        ? await data.map((item, index) => ({
              '#': item.id,
              full_name: item.name,
              phone_number: item.phone,
              email: item.email,
              avatar: item.avatar,
              address: item.address,
              created_at: item.created_at,
              updated_at: item.updated_at,
          }))
        : await {
              '#': data.id,
              full_name: data.name,
              phone_number: data.phone,
              email: data.email,
              avatar: data.avatar,
              address: data.address,
              created_at: data.created_at,
              updated_at: data.updated_at,
          };
};
