import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/index';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    loadinggif: boolean = false;
    returnUrl: string;
   // status: any;
    temp:string;
    imgsrc: string;
    user:User;

    updatepassword='none';

    public loginmenu1 = true;
    public loginmenu2 = false;
    public loginmenu3 = false;
    public loginmenu4 = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
            this.model.currentusername='';
            this.model.currentpassword='';

         }

    ngOnInit() {
        this.imgsrc="assets/images/Triologo.png";
        this.model.currentusername='';
        this.model.currentpassword='';
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    forgetCancel()
    {
        this.loginmenu1 = true;
        this.loginmenu2 = false;
        this.loginmenu3 = false;
        this.loginmenu4 = false;
        this.model.currentusername='';
        this.model.currentpassword='';
 
    }
    forgetPassword(){
        this.loginmenu1 = false;
        this.loginmenu2 = true;
        this.loginmenu3 = false;
        this.loginmenu4 = false;

        this.model.currentusername='';
        this.model.currentpassword='';
    }

   
    submitPassword(){
       
       if(this.model.newPassword1 == this.model.newPassword2) {
        this.authenticationService.resetPassword(this.model.newPassword1,localStorage.getItem('forgetUser'))
        .subscribe(
        data => {

        this.user=data;
        if(this.user.status=='success') 
        {
            this.updatepassword="block";
            this.loginmenu1 = true;
            this.loginmenu2 = false;
            this.loginmenu3 = false;
            this.loginmenu4 = false;
            this.model.currentusername='';
            this.model.currentpassword='';
            this.alertService.success('New Password is updated successfully.');
        }
        if(this.user.status=='failure') 
        {
            this.alertService.success('Please enter valid OTP');

        }


    },
    error => {
            this.alertService.success('Network error.');
    });

       // this.alertService.success('Pass matches');

       }
       else {
        this.alertService.success('Pass word is mismatch please try again');
 
       }
       
        // this.loginmenu1 = false;
       // this.loginmenu2 = false;
       // this.loginmenu3 = true;
    }

    onCloseHandled(){
        this.updatepassword="none";
    }
   
   
    OTPCheck(){
        this.authenticationService.OTPCheck(this.model.otp)
                .subscribe(
            data => {

                this.user=data;
                if(this.user.status=='success') 
                {
                    this.loginmenu1 = false;
                    this.loginmenu2 = false;
                    this.loginmenu3 = false;
                    this.loginmenu4 = true;
                    this.model.newPassword1='';
                    this.model.newPassword2='';
                }
                if(this.user.status=='failure') 
                {
                    this.alertService.success('Please enter valid OTP');

                }


            },
            error => {
    this.alertService.success('Network error.');
            });

    }
    checkUserName(){
        localStorage.setItem('forgetUser',this.model.currentusername);
        //alert("Test"+this.model.currentusername);
        this.authenticationService.checkUserName(this.model.currentusername)
                .subscribe(
            data => {
                this.user=data;
                if(this.user.status=='success') {
                   // this.alertService.success('User name is valid Please enter OTP');
                    this.loginmenu1 = false;
                    this.loginmenu2 = false;
                    this.loginmenu3 = true;
                    this.loginmenu4 = false;
                   
                }
                
                if(this.user.status=='failure') {
                    this.alertService.success('User name is not valid');
                    this.loginmenu1 = false;
                    this.loginmenu2 = true;
                    this.loginmenu3 = false;
                    this.loginmenu4 = false;


                }



            }, 
            error => {
                this.alertService.success('Network error.');
            });
      //  this.alertService.success('User name is valid');
        this.model.currentusername='';
        this.model.otp='';

    }

    login() {
        this.loading= true;	
        //this.loginmenu1 = false;
        console.log('Login User name -->',this.model.currentusername);
        console.log('Login Password -->',this.model.currentpassword);
    
             this.authenticationService.login(this.model.currentusername, this.model.currentpassword)
                .subscribe(
                    data => {
                     this.user=data;
                      console.log("Status --->", this.user.status); 
    
                    console.log("Value", data);
                    if(this.user.status=="admindashboard") {
                            
                            localStorage.setItem('currentusername',this.model.currentusername);
                            localStorage.setItem('userRole',this.user.userRole);
                            localStorage.setItem('memberNumber',this.user.memberNumber);  
                            localStorage.setItem('userloginPrimaryKeyString',this.user.userloginPrimaryKeyString);  
                            localStorage.setItem('pageName',"admindashboard");  

                            this.router.navigate(['/admindashboard']);
                            this.loading= false;
    
                    } 
    
                    if(this.user.status=="itsupportdashboard") {
                            
                        localStorage.setItem('currentusername',this.model.currentusername);
                        localStorage.setItem('userRole',this.user.userRole);
                        localStorage.setItem('memberNumber',this.user.memberNumber);  
                        localStorage.setItem('userloginPrimaryKeyString',this.user.userloginPrimaryKeyString); 
                         localStorage.setItem('pageName',"itsupportdashboard");   
                        this.router.navigate(['/itsupportdashboard']);
                        this.loading= false;
    
                    } 
    
                    if(this.user.status=="financedashboard") {
                                
                        localStorage.setItem('currentusername',this.model.currentusername);
                        localStorage.setItem('userRole',this.user.userRole);
                        localStorage.setItem('memberNumber',this.user.memberNumber);  
                        localStorage.setItem('userloginPrimaryKeyString',this.user.userloginPrimaryKeyString);  
                         localStorage.setItem('pageName',"financedashboard");  
                        this.router.navigate(['/financedashboard']);
                        this.loading= false;
    
                    } 
    
                    if(this.user.status=="memberdashboard") {
                            
                            localStorage.setItem('currentusername',this.model.currentusername);
                            localStorage.setItem('userRole',this.user.userRole);
                            localStorage.setItem('memberNumber',this.user.memberNumber);  
                            localStorage.setItem('userloginPrimaryKeyString',this.user.userloginPrimaryKeyString); 
                            localStorage.setItem('pageName',"memberdashboard");  
                            this.router.navigate(['/memberdashboard']);
                            this.loading= false;
    
                    } 
    
                    if(this.user.status=="agentdashboard") {
                        
                        localStorage.setItem('currentusername',this.model.currentusername);
                        localStorage.setItem('userRole',this.user.userRole);
                        localStorage.setItem('memberNumber',this.user.memberNumber);  
                        localStorage.setItem('userloginPrimaryKeyString',this.user.userloginPrimaryKeyString); 
                        localStorage.setItem('pageName',"agentdashboard"); 
                        this.router.navigate(['/agentdashboard']);
                        this.loading= false;
    
                    } 
    
                    if(this.user.status=="employeedashboard") {
                        
                        localStorage.setItem('currentusername',this.model.currentusername);
                        localStorage.setItem('userRole',this.user.userRole);
                        localStorage.setItem('memberNumber',this.user.memberNumber);  
                        localStorage.setItem('userloginPrimaryKeyString',this.user.userloginPrimaryKeyString);
                        localStorage.setItem('pageName',"employeedashboard");  
                        this.router.navigate(['/employeedashboard']);
                        this.loading= false;
    
                    }   

                    if(this.user.status=="invmanagerempdashboard") {
                        
                        localStorage.setItem('currentusername',this.model.currentusername);
                        localStorage.setItem('userRole',this.user.userRole);
                        localStorage.setItem('memberNumber',this.user.memberNumber);  
                        localStorage.setItem('userloginPrimaryKeyString',this.user.userloginPrimaryKeyString);
                        localStorage.setItem('pageName',"invmanagerempdashboard");  
                        this.router.navigate(['/invmanagerempdashboard']);
                        this.loading= false;
    
                    } 

                    if(this.user.status=="clinicnonmanagerempdashboard") {
                        
                        localStorage.setItem('currentusername',this.model.currentusername);
                        localStorage.setItem('userRole',this.user.userRole);
                        localStorage.setItem('memberNumber',this.user.memberNumber);  
                        localStorage.setItem('userloginPrimaryKeyString',this.user.userloginPrimaryKeyString);
                        localStorage.setItem('pageName',"clinicnonmanagerempdashboard");  
                        this.router.navigate(['/clinicnonmanagerempdashboard']);
                        this.loading= false;
    
                    } 

                    if(this.user.status=="invnonmanagerempdashboard") {
                        
                        localStorage.setItem('currentusername',this.model.currentusername);
                        localStorage.setItem('userRole',this.user.userRole);
                        localStorage.setItem('memberNumber',this.user.memberNumber);  
                        localStorage.setItem('userloginPrimaryKeyString',this.user.userloginPrimaryKeyString);
                        localStorage.setItem('pageName',"invnonmanagerempdashboard");  
                        this.router.navigate(['/invnonmanagerempdashboard']);
                        this.loading= false;
    
                    } 
                    else {
    
                        this.alertService.error(this.user.status);
                        //this.alertService.success('Test');
                        this.loading= false;
                    }
    
                },    
                error => {
                    console.log('Login page Network issue');
                // this.router.navigate(['/login']);
    
                    this.alertService.error('Due to some Technical issue. Please try later');
                    this.loading= false;
                });
        }
}
