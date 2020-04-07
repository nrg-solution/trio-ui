import { Common } from "./common";

export class User extends Common {

  //id: string; 

 // UI Request fields 
  refEmploy:string;
  join_date : any;
  agentName : string;
  clinicCode : string;
  memberNumber: string;
  currentusername: string;
  currentpassword: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  //country: string;
  //phoneNumber: string;
  //emailID: string;
  refmemberID:string;
  bankName:string;
  bankAcctNumber:string;
  actType:string;
  status:string;
  wstatus:string;
  created_date:any;
  agreement:string;
  bclass:string;
   
 // Request Hotel booking UI fields
 selectedCountry:string;
 selectedState:string; 
 categoryname:string;
 cname:string;
 //chechInDate:any;
 //noofrooms:string;
 //noofchild:string;
 //noofadult:string;  
 //bookingdate:any; 
 //bookingtime:any;
 //noofTables:number;

 
 // Menu 3 view 
 commition:string;

 // Response 5 menu view
 memberID:string;
 memberName:string;
 memberType:string;
 memberEmail:string;
 memberPhone:string;
 memberCommition:number;
 memberOvrriding:number;
 memberStatus:string;
 userLoginPrimaryKey:number;
 userloginPrimaryKeyString: string;
 requestType:string;
 requestTypeStr:string;
 // Response 
 userRole:string;
 groupName:number;
 sNo:number;

 totalAmount:number;
 grandTotal:number;
 otp:string;


 category:string;
 companyname:string;
 file:File;
 //hotelImagePath:string;
 withdrawamt:number;
 invoiceNumber: string;

// Clinic entity

noofclinics:number;
paymentpath: string;
investmentDate:any;
enrollmentDate:any;
clinicName:string;
clinicName2:string;
clinicName3:string;
clinicName4:string;
clinicName5:string;
clinicName6:string;
clinicName7:string;
clinicName8:string;
clinicName9:string;
clinicName10:string;



withdrawDate:string;
percentage:string;
cliniclist:string;
withdrawAmount:number;

// Common
primaryKey:number; 
name:string;
accountNumber:string;
bankBranchName:string;
address:string;

//PhoneNumber:string;
//EmailID:string;
//agentBankName:string;
//agentAccountNumber:string;
//agentBankBranchName:string;

// Agent
agentType:string; 
agentCode:string; 

// Employee
salary:string;
//employeeName:string;
employeeCode:string;
empType:string;
empName:string;

fromDate:Date;
toDate:Date;
clinicPhoneNumber:string;
agentPhoneNumber:string;
createdDate:Date;
empRole:string;
}
