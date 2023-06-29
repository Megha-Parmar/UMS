export const SOCKET_ENDPOINT = 'localhost:3000';
export const GlobalConstants = {
    httpHeader: {
        applicationJson: 'application/json'
    },
    apiUrls: {
        auth: {
            login: '/api/auth/login',
            setNewPassword: '/api/auth/generate-password',
            forgetPassword: '/api/auth/forget-password',
            sSOLogin: '/api/auth/sso-login'

        },
        user: {
            getUserList: '/api/user',
            getUserDetail: '/api/user/',
            getRole: '/api/role',
            saveUser: '/api/user',
            saveSSOUser: '/api/user/sso',
            updateUser: '/api/user/',
            deleteUser: '/api/user/',
        },
        chat: {
            getUserList: '/api/chat/',
        }
    },
    appRoutePaths: {
        shared: "src/app/_modal/*"
    },


    token: 'token',
    userName: 'userName',
    user: 'user',
    page: 'page',
    limit: 'limit'
}

export const SecretConstant = {
    localStorageEncryptSecret: 'd6F3Efeqd6F3Efeq',
    sessionInitial: 'userManagementSystem'
}

export const QueryParamsConstant = {
    page: 'page',
    limit: 'limit',
}

export const SocketConstant = {
    msgToServer: 'msgToServer',
    msgToClient: 'msgToClient',
}

export const FinalConstant = {
    page: 1,
    limit: 5,
}

export const routerURLConstant = {
    auth: 'auth',
    login: 'login',
    generatePassword: 'generate-password',
    forgetPassword: 'forget-password',
    resetPassword: 'reset-password',
    user: 'user',
    dashboard: 'dashboard',
    chat: 'chat'


}


export enum UserLoginType {
    Register = 'register',
    SSO = 'sso',
    Both = 'both'
}

export enum SSOLoginType {
    FB = 'facebook',
    GOOGLE = 'google',
}

export const ssoMockUser = {
    dob: "1996-06-11T18:30:00.000Z",
    email: "ssomockuser@yopmail.com",
    firstName: "megha",
    lastName: "Patel",
    phoneNumber: "3436547686",
    // role: "642fc2dfdc4869956c3b5a97",
    userName: "richP",
    status: "ACTIVE"
}