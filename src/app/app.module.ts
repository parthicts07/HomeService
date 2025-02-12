import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Core/navbar/navbar.component';
import { CarouselComponent } from './Core/carousel/carousel.component';
import { CustomerLoginComponent } from '../app/Login/CustomerLogin/customer-login/customer-login.component';
import { ProfessionalLoginComponent } from '../app/Login/ProfessionalLogin/professional-login/professional-login.component';
import { AdminLoginComponent } from '../app/Login/AdminLogin/admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerNavbarComponent } from '../app/Dashboard/Customer/customer-navbar/customer-navbar.component';
import { CustomerHomeComponent } from '../app/Dashboard/Customer/customer-home/customer-home.component';
import { ProfessionalNavbarComponent } from '../app/Dashboard/Professional/professional-navbar/professional-navbar.component';
import { AdminNavbarComponent } from '../app/Dashboard/Admin/admin-navbar/admin-navbar.component';
import { RouterOutlet } from '@angular/router';
import { ProfessionalHomeComponent } from './Dashboard/Professional/professional-home/professional-home/professional-home.component';
import { AdminHomeComponent } from './Dashboard/Admin/admin-home/admin-home/admin-home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerPackageComponent } from './Dashboard/Customer/customer-package/customer-package.component';
import { CutomerDashboardComponent } from './Dashboard/Customer/cutomer-dashboard/cutomer-dashboard.component';
import { ResponseModalComponent } from './response-modal/response-modal.component';
import { CustomerProfileComponent } from './Dashboard/Customer/customer-profile/customer-profile.component';
import { CustomerBookingsComponent } from './Dashboard/Customer/customer-bookings/customer-bookings.component';
import { CustomerPaymentsComponent } from './Dashboard/Customer/customer-payments/customer-payments.component';
import { ProfessionalDashboardComponent } from './Dashboard/Professional/professional-dashboard/professional-dashboard.component';
import { ProfessionalProfileComponent } from './Dashboard/Professional/professional-profile/professional-profile.component';
import { ProfessionalAppointmentComponent } from './Dashboard/Professional/professional-appointment/professional-appointment.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ProfessionalBookingComponent } from './Dashboard/Professional/professional-booking/professional-booking.component';
import { ProfessionalServicesComponent } from './Dashboard/Professional/professional-services/professional-services.component';
import { ProfessionalPackagesComponent } from './Dashboard/Professional/professional-packages/professional-packages.component';
import { ProfessionalRatingsComponent } from './Dashboard/Professional/professional-ratings/professional-ratings.component';
import { ProfessionalPaymentsComponent } from './Dashboard/Professional/professional-payments/professional-payments.component';
import { AdminDashboardComponent } from './Dashboard/Admin/admin-dashboard/admin-dashboard.component';
import { AdminReportsComponent } from './Dashboard/Admin/admin-reports/admin-reports.component';
import { CustomerReportComponent } from './Dashboard/Customer/customer-report/customer-report.component';
import { AdminRequestsComponent } from './Dashboard/Admin/admin-requests/admin-requests.component';
import { AdminPackagesComponent } from './Dashboard/Admin/admin-packages/admin-packages.component';
import { AdminServicesComponent } from './Dashboard/Admin/admin-services/admin-services.component';
import { AdminUsersComponent } from './Dashboard/Admin/admin-users/admin-users.component';
import { AdminBookingsComponent } from './Dashboard/Admin/admin-bookings/admin-bookings.component';
import { AboutUsComponent } from './Core/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    CustomerLoginComponent,
    ProfessionalLoginComponent,
    AdminLoginComponent,
    CustomerNavbarComponent,
    CustomerHomeComponent,
    ProfessionalNavbarComponent,
    AdminNavbarComponent,
    ProfessionalHomeComponent,
    AdminHomeComponent,
    CustomerPackageComponent,
    CutomerDashboardComponent,
    ResponseModalComponent,
    CustomerProfileComponent,
    CustomerBookingsComponent,
    CustomerPaymentsComponent,
    ProfessionalDashboardComponent,
    ProfessionalProfileComponent,
    ProfessionalAppointmentComponent,
    ProfessionalBookingComponent,
    ProfessionalServicesComponent,
    ProfessionalPackagesComponent,
    ProfessionalRatingsComponent,
    ProfessionalPaymentsComponent,
    AdminDashboardComponent,
    AdminReportsComponent,
    CustomerReportComponent,
    AdminRequestsComponent,
    AdminPackagesComponent,
    AdminServicesComponent,
    AdminUsersComponent,
    AdminBookingsComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    ReactiveFormsModule,
    NgbModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

