interface AccessTokenUser {
    id: number;
    name: string;
    email: string;
    iat: number;
    exp: number;
};

export type {
    AccessTokenUser,
};