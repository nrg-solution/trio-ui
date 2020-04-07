import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AdmindashboardComponent } from './admindashboard/index';
import { MemberdashboardComponent } from './memberdashboard/index';
import { AgentdashboardComponent } from './agentdashboard/index';
import { PaymentuploadComponent } from './paymentupload/index';
import { ItsupportdashboardComponent } from './itsupportdashboard/index';
import { FinancedashboardComponent } from './financedashboard/index';
import { DetailsUploadComponent } from './details-upload/index'; 
import { AuthGuard } from './_guards/index';
import { ClinicreportComponent } from './clinicreport/clinicreport.component';
import { HeaderComponent } from './header/header.component';
import { ReportMenusComponent } from './report-menus/report-menus.component';
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

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admindashboard', component: AdmindashboardComponent },
    { path: 'memberdashboard',component: MemberdashboardComponent },
    { path: 'agentdashboard',component: AgentdashboardComponent },
    { path: 'paymentupload',component: PaymentuploadComponent },
    { path: 'itsupportdashboard',component: ItsupportdashboardComponent },
    { path: 'financedashboard',component: FinancedashboardComponent },
    { path: 'details-upload',component: DetailsUploadComponent },
    { path: 'clinicreport',component: ClinicreportComponent },
    { path: 'header',component: HeaderComponent },
    { path: 'report-menus',component: ReportMenusComponent },
    { path: 'agent-report',component: AgentReportComponent },
    { path: 'clinicagentreport',component: ClinicagentreportComponent },
    { path: 'investagentreport',component: InvestagentreportComponent },
    { path: 'partnerreport',component: PartnerreportComponent },
    { path: 'employeereport',component: EmployeereportComponent },
    { path: 'paymentreport',component: PaymentreportComponent },
    { path: 'salesreport',component: SalesreportComponent },
    { path: 'employeedashboard',component: EmployeedashboardComponent },
    { path: 'invmanagerempdashboard',component: InvmanagerempdashboardComponent },
    { path: 'clinicnonmanagerempdashboard',component: ClinicnonmanagerempdashboardComponent },
    { path: 'invnonmanagerempdashboard',component: InvnonmanagerempdashboardComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
