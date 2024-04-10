import bcrypt from "bcrypt";

export const hashPassword = async (str: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(str, salt);
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};

export const comparePassword = async (password: string, rePassword: string) => {
    try {
        return bcrypt.compare(password, rePassword);
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};
