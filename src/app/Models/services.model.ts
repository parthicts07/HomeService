export interface Service {
    serviceId: number;
    serviceName: string;
    description: string;
    isFlagged: boolean;
    professionalId: number;
    professional?: any;
    packages?: any;
    servicePictureUrl?:string;
  }