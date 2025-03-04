import { Role } from "../config/constants";

export interface UserRequest {
    username: string;
    password: string;
    name: string;
    role: Role;
}

export interface UserResponse {
    id: number;
    username: string;
    name: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
