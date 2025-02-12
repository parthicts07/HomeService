export interface ProfessionalLoginMode{
    userName:string,
    password:string
}

export interface ProfessionalLoginResponse{
    token:string
}

export interface ProfessionalSignUpModel{
    userName:string,
    password:string,
    email:string,
    professionalName:string,
    mobileNumber:string,
    experienceYears:number
    bio:string,
    skills:string,
    service:string,
    nationality:string,
    aadhaarCard:string
}

export interface ProfessionalRegisterResponse{
    success: boolean,
    message: string
}