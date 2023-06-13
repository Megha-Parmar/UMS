
export interface User {
    _id: number,
    userName: string,
    firstName: string,
    lastName: string,
    uniqueId: string,
    phoneNumber: string
    email: string,
    dob: Date
    status: string,
    role: Role
}
export interface Chat {
    _id: number;
    message: string;
    receiverId: number;
    senderId: number;
    type: string,
    createdAt: Date
}

export interface Role {
    _id: number;
    name: string;
    value: string
}

export interface ListResponse {
    users: User | User[];
    currentPage: string;
    totalData: number;
}

export interface ChatListResponse {
    chats: Chat[];
    currentPage: string;
    totalData: number;
}
export interface ListRespons {
    users: User[];
    currentPage: string;
    totalData: number;
}

export interface APIResponse<Modal> {
    body: Modal;
    success: boolean;
    statusCode: number;
    message: string
} 