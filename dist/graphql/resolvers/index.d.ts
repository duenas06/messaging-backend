declare const resolvers: {
    unProtectedResolvers: {
        Query: {
            getUserById: (_: any, args: any) => Promise<{
                status: string;
                message: string;
                data: import("../models/UserModel").default;
            } | {
                status: string;
                message: string;
                data: null;
            }>;
        };
        Mutation: {
            postNewUser: (_: any, args: any, conteValue: import("../../constants/interfaces/IUser.interface").default) => Promise<{
                status: string;
                message: string;
                data: import("../models/UserModel").default | null;
            }>;
        };
    }[];
    protectedResolvers: {
        Query: {
            getUserById: (_: any, args: any) => Promise<{
                status: string;
                message: string;
                data: import("../models/UserModel").default;
            } | {
                status: string;
                message: string;
                data: null;
            }>;
        };
        Mutation: {
            postNewUser: (_: any, args: any, conteValue: import("../../constants/interfaces/IUser.interface").default) => Promise<{
                status: string;
                message: string;
                data: import("../models/UserModel").default | null;
            }>;
        };
    }[];
};
export default resolvers;
