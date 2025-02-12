import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLoginComponent } from '../app/Login/CustomerLogin/customer-login/customer-login.component';
import { ProfessionalLoginComponent } from './Login/ProfessionalLogin/professional-login/professional-login.component';
import { AdminLoginComponent } from './Login/AdminLogin/admin-login/admin-login.component';
import { CustomerNavbarComponent } from './Dashboard/Customer/customer-navbar/customer-navbar.component';
import { CustomerHomeComponent } from './Dashboard/Customer/customer-home/customer-home.component';
import { AdminNavbarComponent } from './Dashboard/Admin/admin-navbar/admin-navbar.component';
import { ProfessionalHomeComponent } from './Dashboard/Professional/professional-home/professional-home/professional-home.component';
import { CustomerPackageComponent } from './Dashboard/Customer/customer-package/customer-package.component';
import { CustomerProfileComponent } from './Dashboard/Customer/customer-profile/customer-profile.component';
import { CustomerBookingsComponent } from './Dashboard/Customer/customer-bookings/customer-bookings.component';
import { CustomerPaymentsComponent } from './Dashboard/Customer/customer-payments/customer-payments.component';
import { ProfessionalProfileComponent } from './Dashboard/Professional/professional-profile/professional-profile.component';
import { ProfessionalAppointmentComponent } from './Dashboard/Professional/professional-appointment/professional-appointment.component';
import { ProfessionalBookingComponent } from './Dashboard/Professional/professional-booking/professional-booking.component';
import { ProfessionalServicesComponent } from './Dashboard/Professional/professional-services/professional-services.component';
import { ProfessionalPackagesComponent } from './Dashboard/Professional/professional-packages/professional-packages.component';
import { ProfessionalRatingsComponent } from './Dashboard/Professional/professional-ratings/professional-ratings.component';
import { ProfessionalPaymentsComponent } from './Dashboard/Professional/professional-payments/professional-payments.component';
import { AdminReportsComponent } from './Dashboard/Admin/admin-reports/admin-reports.component';
import { CustomerReportComponent } from './Dashboard/Customer/customer-report/customer-report.component';
import { AdminRequestsComponent } from './Dashboard/Admin/admin-requests/admin-requests.component';
import { AdminPackagesComponent } from './Dashboard/Admin/admin-packages/admin-packages.component';
import { AdminServicesComponent } from './Dashboard/Admin/admin-services/admin-services.component';
import { AdminUsersComponent } from './Dashboard/Admin/admin-users/admin-users.component';
import { AdminBookingsComponent } from './Dashboard/Admin/admin-bookings/admin-bookings.component';
import { AboutUsComponent } from './Core/about-us/about-us.component';
import { AdminHomeComponent } from './Dashboard/Admin/admin-home/admin-home/admin-home.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path : 'login/customerLogin',
    component : CustomerLoginComponent
  },
  {
    path : 'login/adminLogin',
    component : AdminLoginComponent 
  },
  {
    path : 'login/professionalLogin',
    component : ProfessionalLoginComponent
  },
  {
    path: 'about',
    component: AboutUsComponent
  },
  {
    path : 'customer/navbar',
    component : CustomerNavbarComponent
  },
  {
    path:'customer/home',
    component : CustomerHomeComponent
  },
  {
    path: 'admin/home',
    component: AdminHomeComponent
  },
  {
    path: 'professional/home',
    component: ProfessionalHomeComponent
  },
  {
    path: 'customer/packages/:serviceId',
    component: CustomerPackageComponent
  },
  {
    path: 'customer/profile',
    component: CustomerProfileComponent
  },
  { 
    path: 'customer/bookings', 
    component: CustomerBookingsComponent 
  },
  {
    path: 'customer/payments',
    component: CustomerPaymentsComponent
  },
  { 
    path: 'customer/report', 
    component: CustomerReportComponent 
  },
  {
    path: 'professional/profile',
    component: ProfessionalProfileComponent
  },
  {
    path: 'professional/appointments',
    component: ProfessionalAppointmentComponent
  },
  {
    path: 'professional/bookings',
    component: ProfessionalBookingComponent
  },
  { 
    path: 'professional/service', 
    component: ProfessionalServicesComponent 
  },
  { 
    path: 'professional/service/:serviceId/packages', 
    component: ProfessionalPackagesComponent 
  },
  { 
    path: 'professional/payments', 
    component: ProfessionalPaymentsComponent 
  },
  { 
    path: 'professional/ratings', 
    component: ProfessionalRatingsComponent 
  },
  { 
    path: 'admin/reports', 
    component: AdminReportsComponent 
  },
  {
    path: 'admin/requests',
    component: AdminRequestsComponent
  },
  {
    path: 'admin/packages',
    component: AdminPackagesComponent
  },
  {
    path: 'admin/services',
    component: AdminServicesComponent
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent
  },
  {
    path: 'admin/bookings',
    component: AdminBookingsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
