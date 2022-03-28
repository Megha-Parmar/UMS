
export interface User {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    uniqueId: string,
    phoneNumber: string
    email: string,
    dob: Date
    status: string,
    role: Role
}


export interface Role {
    id: number;
    name: string;
    value: string
}

export var userArray: User[];

export var userObj: User;

export interface ListResponse {
    success: boolean,
    body: User[] | User,
    totalData: number
}


export interface SingleResponse {
    success: boolean,
    body: User,
    totalData: number
}

export type APIResponse = ListResponse | SingleResponse
