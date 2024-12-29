interface AccessTokenUser {
    id: number;
    email: string;
    name: string;
    role: string;
    iat: number;
    exp: number;
};

export type {
    AccessTokenUser,
};