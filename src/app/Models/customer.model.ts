export interface Customer {
    customerName: string;
    dateOfBirth: string;
    address: string;
    city?: string;
    state?: string;
    zipCode?: string;
    userId: number;
    userName: string;
    password: string;
    email: string;
    mobileNumber?: string;
    role: number;
    isFlagged: boolean;
}

export interface Package {
  packageId: number;
  packageName: string;
  price: number;
  details: string;
  isFlagged: boolean;
  serviceId: number;
  service: any;
}
