import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AlertService, AuthenticationService, UserService,ServerURL} from './_services/index';
import { AlertComponent } from './_directives/index';
import { fakeBackendProvider } from './_helpers/index';
import { JwtInterceptor } from './_helpers/index';
import { AuthGuard } from './_guards/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AdmindashboardComponent } from './admindashboard/index';
import { MemberdashboardComponent } from './memberdashboard/index';
import { AgentdashboardComponent } from './agentdashboard/index';
import { PaymentuploadComponent } from './paymentupload/index';
import { ItsupportdashboardComponent } from './itsupportdashboard/index';
import { FinancedashboardComponent } from './financedashboard/index'; 
import { DetailsUploadComponent } from './details-upload/index';
import { ClinicreportComponent } from './clinicreport/index';
import { HeaderComponent } from './header/index';
import { ReportMenusComponent } from './report-menus/index';
import { AgentReportComponent } from './agent-report/agent-report.component';
import { ClinicagentreportComponent } from './clinicagentreport/clinicagentreport.component';
import { InvestagentreportComponent } from './investagentreport/investagentreport.component';
import { PartnerreportComponent } from './partnerreport/partnerreport.component';
import { EmployeereportComponent } from './employeereport/employeereport.component';
import { PaymentreportComponent } from './paymentreport/paymentreport.component';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';
import { InvmanagerempdashboardComponent } from './invmanagerempdashboard/invmanagerempdashboard.component';
import { ClinicnonmanagerempdashboardComponent } from './clinicnonmanagerempdashboard/clinicnonmanagerempdashboard.component';
import { InvnonmanagerempdashboardComponent } from './invnonmanagerempdashboard/invnonmanagerempdashboard.component';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing
    ],   
    declarations: [
        AppComponent,
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        AdmindashboardComponent,
        MemberdashboardComponent,
        AgentdashboardComponent,
        PaymentuploadComponent,
        ItsupportdashboardComponent,
        FinancedashboardComponent,
        DetailsUploadComponent,
        ClinicreportComponent,
        HeaderComponent,
        ReportMenusComponent,
        AgentReportComponent,
        ClinicagentreportComponent,
        InvestagentreportComponent,
        PartnerreportComponent,
        EmployeereportComponent,
        PaymentreportComponent,
        SalesreportComponent,
        EmployeedashboardComponent,
        InvmanagerempdashboardComponent,
        ClinicnonmanagerempdashboardComponent,
        InvnonmanagerempdashboardComponent,
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ServerURL,

        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
