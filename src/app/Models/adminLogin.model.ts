export interface AdminLoginModel{
    userName:string,
    password:string,
    mobileNumber:string
}

export interface OTPModel{
    captcha:string,
    otp:string
}

export interface AdminLoginResponse{
    token:string
}