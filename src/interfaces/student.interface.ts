export interface StudentRequest {
    firstName: string;
    lastName: string;
    nickName: string;
    age: number;
}

export interface StudentResponse {
    id: number;
    firstName: string;
    lastName: string;
    nickName: string;
    age: number;
    createAt: Date;
}
