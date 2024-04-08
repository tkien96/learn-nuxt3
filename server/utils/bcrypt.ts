import bcrypt from "bcrypt";

export const hashPassword = async (string: String) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(string, salt);
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};

export const comparePassword = async (password: String, rePassword: String) => {
    try {
        return bcrypt.compare(password, rePassword);
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};
