export interface CustomerLoginModel{
    userName:string,
    password:string
}

export interface CustomerLoginResponse {
    success: boolean;
    token?: string;
    message: string;
}

export interface CustomerSignUpModel{
    userName: string,
    password: string,
    email: string,
    customerName: string,
    mobileNumber: string,
    address: string,
    city: string,
    state: string,
    zipCode: string
}

export interface CustomerRegisterResponse{
    success: boolean,
    message: string
}