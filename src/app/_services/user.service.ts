import { Injectable } from '@angular/core';
import { User } from '../_models';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { ServerURL } from './url';


@Injectable()
export class UserService {

    suburl:string;

private commonURL = this.globalsURL.serverURL;

constructor(private http: HttpClient,private globalsURL: ServerURL) { }


    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }    

  // Create new Register
    create(user: User) {
       console.log('Member ID ----------->'+user.refmemberID);
       console.log('Email ID ----------->'+user.emailID);
       console.log('Country ----------->'+user.selectedCountry);
       console.log('Phone number ----------->'+user.phoneNumber);
       console.log('First name ----------->'+user.firstName);
       console.log('Last name ----------->'+user.lastName);
       console.log('User name ----------->'+user.username);
       console.log('Password ----------->'+user.password);

       console.log('Bank name ----------->'+user.bankName);
       console.log('Acct Number ----------->'+user.bankAcctNumber);
       console.log('Acct type  ----------->'+user.actType);

        return this.http.post<User>(this.commonURL+'register', user);
    }

    getCountry()
    {
        return this.http.get(this.commonURL+'getAllCountry');
    }

    // ----------------- My member list ----------------------------
    getMyMemberList(memberNumber: string){
       return this.http.get(this.commonURL+'getMyMemberList?memberNumber='+memberNumber);
    }

    // ------------ All member list --------------------
    getAllMemberList(requestType: string){
       return this.http.get(this.commonURL+'getAllMemberList?requestType='+requestType);
    }

    // ------------ All Clinic list --------------------
    getAllClinicList(requestType: string){
        return this.http.get(this.commonURL+'getAllClinicList?requestType='+requestType);
    }
    // Load all Clinic data for Menu - Clinic view
    getAllClinicList2(requestType: string){
        return this.http.get(this.commonURL+'getAllClinicList2?requestType='+requestType);
    }


    // ------------------------- Approval ------------------------ 
    getApproved(userloginPK:number,requestType:string) {
        return this.http.get<User>(this.commonURL+'getApproved?userLoginPrimaryKey='+userloginPK+'&requestType='+requestType);
    }
    
    getState(sCountry: string) 
    {
        var baseURL = this.commonURL+'getState';
        var subURL = '?country=' +sCountry;
        var FinalURL;// = '';
        FinalURL = baseURL+subURL;
        return this.http.get(FinalURL);
    }

    //getHotel(user: User){ 
     // return this.http.post(this.commonURL+'getHotelName',user);
    //}
  
   getMyProfile(primaryKeyStr:string){
       return this.http.get<User>(this.commonURL+'getMyProfile?primaryKeyStr='+primaryKeyStr);
    } 


    getMyCommandOverInfo(primaryKeyStr:string){
        return this.http.get(this.commonURL+'getMyCommandOverInfo?primaryKeyStr='+primaryKeyStr);
    } 


    getCompanyInfo(selectedCountry:string){
        console.log('User ServicegetCompanyList TS Called.');
        console.log('Choosen Country'+selectedCountry);
        return this.http.get(this.commonURL+'getCountryInfo?selectedCountry='+selectedCountry);
    } 

    loadHoteldashboard()
    {
        return this.http.get(this.commonURL+'loadHotelList'); 
    }

    updateMyProfile(user:User){
       return this.http.post<User>(this.commonURL+'updateMyProfile', user);
    }  

    submitWithdraw(user: User){
        return this.http.post<User>(this.commonURL+'submitWith', user);
    }
    getReceipt(trioNumber: string){
        return this.http.post<User>(this.commonURL+'getReceipt', trioNumber);
    }
    getLedgerInfo(primaryKeyStr:string, requestType:number){
        return this.http.get(this.commonURL+'getLedgerInfo?primaryKeyStr='+primaryKeyStr+'&requestType='+requestType);
    }

    saveClinicOnMember(user: User){
        return this.http.post<User>(this.commonURL+'addClinic', user);
    }
    // Open Withdraw
    
    openWithdraw(user:User){
       return this.http.post<User>(this.commonURL+'openWithdraw', user);
       // return this.http.post<User>(this.commonURL+'openWithdraw?value1='+value1+'&value2='+value2);
    }

    // ------------ All Clinic list --------------------
   // getAllClinicList(requestType: string){
    //    return this.http.get(this.commonURL+'getAllClinicList?requestType='+requestType);
   //}

   //-------------------- Withdraw Approval ----------------
   getApprovewithdraw(user:User){
        return this.http.post<User>(this.commonURL+'getApprovewithdraw', user); 
   }


   //getAgentInfo(primaryKeyStr:string){
    getAgentInfo(){
        return this.http.get(this.commonURL+'getAgentInfo');
    } 

    saveAgent(user:User){
        return this.http.post<User>(this.commonURL+'saveAgent', user); 
    }


    getAgentView(agentPK:number,agentCode:string,requestType:string){
        return this.http.get<User>(this.commonURL+'getAgentView?agentPK='+agentPK+'&agentCode='+agentCode+'&requestType='+requestType);
    }

    setAgentUpdate(user:User){
        return this.http.post<User>(this.commonURL+'setAgentUpdate', user);
    }

    saveEmployee(user:User){
        return this.http.post<User>(this.commonURL+'saveEmployee', user); 
    }

    getEmployeeInfo(){
        return this.http.get(this.commonURL+'getEmployeeInfo');
    } 

    getEmployView(employeePK:number,employeeCode:string,requestType:string){
        return this.http.get<User>(this.commonURL+'getEmployView?employeePK='+employeePK+'&employeeCode='+employeeCode+'&requestType='+requestType);
    }

    setEmployUpdate(user:User){
        return this.http.post<User>(this.commonURL+'setEmployeeUpdate', user);
    }

    setAgentRemove(agentCode:string,agentPK:number){
        return this.http.delete<User>(this.commonURL+'setAgentRemove?agentPK='+agentPK+'&agentCode='+agentCode);
    }
  
    setEmployeeRemove(employeeCode:string,employeePK:number){
        return this.http.delete<User>(this.commonURL+'setEmployeeRemove?employeePK='+employeePK+'&employeeCode='+employeeCode);
    } 
    
    getAgentList()
    {
        return this.http.get(this.commonURL+'getAllAgentList');
    } 

    getEmployList()
    {
        return this.http.get(this.commonURL+'getAllEmployList');
    } 

    registerClinic(user:User){
        return this.http.post<User>(this.commonURL+'saveClinic', user); 
    }

    getClinicInfo(){
        return this.http.get(this.commonURL+'getClinicInfo');
    } 

    getClinicView(Code:string,clinicPK:number,requestType:string){
        return this.http.get<User>(this.commonURL+'getClinicView?Code='+Code+'&clinicPK='+clinicPK+'&requestType='+requestType);
    }

    setClinicUpdate(user:User){
        return this.http.post<User>(this.commonURL+'setClinicUpdate', user);
    }

    setClinicRemove(code:string,clinicPK:number){
        return this.http.delete<User>(this.commonURL+'setClinicRemove?clinicPK='+clinicPK+'&code='+code);
    }

    getAgentName(){
        return this.http.get(this.commonURL+'getAgentName');
    }

   //@ts-nocheck getEmployeeName(){
    getEmployeeName(empRole:string){
        return this.http.get<User>(this.commonURL+'getEmployeeName?empRole='+empRole);
    }

    getClinicName(){
        return this.http.get(this.commonURL+'getClinicName');   
    }

    // ------- Clinic Agent Report for Admin Login -----
    getAgentClinicReport(agentName:string,fromDate:Date,toDate:Date){
        return this.http.get<User>(this.commonURL+'getAgentClinicReport?agentName='+agentName+'&fromDate='+fromDate+'&toDate='+toDate);
    }
    // ------- Clinic InvAgent Report for Admin Login -----
    getAllAgentInvReport(agentName:string,fromDate:string,toDate:string){
        return this.http.get(this.commonURL+'getAllInvAgentReport?agentName='+agentName+'&fromDate='+fromDate+'&toDate='+toDate);
    }

    getinvAgentName(){
        return this.http.get(this.commonURL+'getinvAgentName');
    }
    getAgentMyProfile(primaryKeyStr:string){
        return this.http.get<User>(this.commonURL+'getAgentMyProfile?primaryKeyStr='+primaryKeyStr);
    } 
    // ------- Clinic Agent Report for Agent Login -----
    getClinicAgentReport(agentCode:string){
        return this.http.get<User>(this.commonURL+'getClinicAgentReport?agentCode='+agentCode);
    }  
    // ------- Investment Agent Report for Agent Login -----
    getInvAgentReport(agentCode:string){
        return this.http.get<User>(this.commonURL+'getInvAgentReport?agentCode='+agentCode);
    }
    // ----- Member Clinic Report ----------
    getMemberClinicReport(fromDate:Date,toDate:Date,name:string,empName:string){
        return this.http.get<User>(this.commonURL+'getMemberClinicReport?fromDate='+fromDate+'&toDate='+toDate
            +'&name='+name+'&empName='+empName);
    }
    // ----- Member Report ----------
    getMemberReport(fromDate:Date,toDate:Date,requestType:string,payStatus:string,status:string){
        return this.http.get<User>(this.commonURL+'getMemberReport?fromDate='+fromDate+'&toDate='+toDate+'&requestType='+requestType
          +'&payStatus='+payStatus+'&status='+status);   
    }
    // ----- Employee Report ----------
    getEmployeeReport(fromDate:Date,toDate:Date,empRole:string){
        return this.http.get<User>(this.commonURL+'getEmployeeReport?fromDate='+fromDate+'&toDate='+toDate+'&empRole='+empRole);
    }
    //------------ Update Agent Profile ------------
    updateAgentProfile(user:User){
        return this.http.post<User>(this.commonURL+'updateAgentProfile',user);
    }
   
    //------- Employee Profile -------------
    getEmployeeProfile(primaryKeyStr:string){
        return this.http.get<User>(this.commonURL+'getEmployeeProfile?primaryKeyStr='+primaryKeyStr);
    }
    //------------ Update Employee Profile ------------
    updateEmpProfile(user:User){
        return this.http.post<User>(this.commonURL+'updateEmpProfile',user);
    }
    //------------ getEmployee Report ----------
    getEmpReport(employeeCode : string){
        return this.http.get<User>(this.commonURL+'getEmpReport?employeeCode='+employeeCode);
    }

    getBankName(){
        return this.http.get(this.commonURL+'getBankName');
    }

    searchAgent(selectedCountry:string,agentType:string,name:string,agentCode:string,bankName:string){
        return this.http.get<User>(this.commonURL+'searchAgent?selectedCountry='+selectedCountry+'&agentType='+
        agentType+'&name='+name+'&agentCode='+agentCode+'&bankName='+bankName);
    }

    searchEmployee(selectedCountry:string,empType:string,name:string,employeeCode:string){
        return this.http.get<User>(this.commonURL+'searchEmployee?selectedCountry='+selectedCountry+
        '&empType='+empType+'&name='+name+'&employeeCode='+employeeCode);
    }

    searchClinic(name:string){
        return this.http.get<User>(this.commonURL+'searchClinic?name='+name);
    }

    searchPartnerClinic(fromDate:Date,toDate:Date,agentCode:string,name:string){
        return this.http.get<User>(this.commonURL+'searchPartnerClinic?fromDate='+fromDate+
        '&toDate='+toDate+'&agentCode='+agentCode+'&name='+name);
    }

    getSalesClincReport(selectedMonth:string,reportName:string,name:string){
        return this.http.get<User>(this.commonURL+'getSalesClincReport?selectedMonth='+selectedMonth+'&reportName='+reportName
            +'&name='+name);
    }

    getSalesPartnerReport(selectedMonth:string,reportName:string,memberName:string){
        return this.http.get<User>(this.commonURL+'getSalesPartnerReport?selectedMonth='+selectedMonth+'&reportName='+reportName
            +'&memberName='+memberName);
    }
    getSalesEmpReport(selectedMonth:string,reportName:string,empName:string){
        return this.http.get<User>(this.commonURL+'getSalesEmployeeReport?selectedMonth='+selectedMonth+'&reportName='+reportName
            +'&empName='+empName);
    }

    MyClinicView(agentCode:string,primaryKey:number){
        return this.http.get<User>(this.commonURL+'MyClinicView?agentCode='+agentCode+'&primaryKey='+primaryKey);
    }

    MyEmployeeView(refEmploy:string){
        return this.http.get<User>(this.commonURL+'MyEmployeeView?refEmploy='+refEmploy);
    }

    MyClinicNameView(primaryKey:number){
        return this.http.get<User>(this.commonURL+'MyClinicNameView?primaryKey='+primaryKey);
    }

    MyEmpClinicView(employeeCode:string,primaryKey:number){
        return this.http.get<User>(this.commonURL+'MyEmpClinicView?employeeCode='+employeeCode+'&primaryKey='+primaryKey);
    }

    MyEmpAgentView(employeeCode :string,primaryKey :number){
        return this.http.get<User>(this.commonURL+'MyEmpAgentView?employeeCode='+employeeCode+'&primaryKey='+primaryKey);
    }

    getEditClinicName(trioNumber: string){
        return this.http.get(this.commonURL+'getEditClinicName?trioNumber='+trioNumber);   
    }

    setPartnerClinicUpdate(user:User){
        return this.http.post<User>(this.commonURL+'setPartnerClinicUpdate',user);
    }

    getPartnerName(){
        return this.http.get(this.commonURL+'getPartnerName');
    }

    searchAllPartner(selectedCountry:String,memberName:String,payStatus:string,agentCode:string){
        return this.http.get<User>(this.commonURL+'searchAllPartner?selectedCountry='+selectedCountry+
        '&memberName='+memberName+'&payStatus='+payStatus+'&agentCode='+agentCode);
    }

    searchPartnerNonClinic(fromDate:Date,toDate:Date,agentCode:string){
        return this.http.get<User>(this.commonURL+'searchPartnerNonClinic?fromDate='+fromDate+
            '&toDate='+toDate+'&agentCode='+agentCode);
    }

}          