if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET environment variable!");
}

export const JWT_SECRET = process.env.JWT_SECRET || "";
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing. Please set it in your .env file.");
}

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
}
