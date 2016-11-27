/**
 * Created by Ken on 11/22/16.
 */
import {Component, ViewChild, ElementRef, OnInit} from "@angular/core";
import {STATUS} from "angular-in-memory-web-api";
import {Constants} from "../services/Constants";
import {HttpService} from "../services/http.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

declare var $:any;

@Component({
    selector: 'navbar',
    templateUrl: 'app/views/navbar.component.html'
})
export class NavBarComponent implements OnInit{
    name:string;
    pwd:string;
    alert:string;
    isAdmin:boolean=false;
    @ViewChild('loginForm') modal:ElementRef;

    constructor(private http:HttpService,
                private constants:Constants,
                private userService:UserService,
                private router:Router){}

    ngOnInit(): void {
        if(this.userService.getUser()!=null) this.isAdmin=true;
    }


    login():void{
        this.alert="";
        this.isAdmin=false;
        this.userService.setUser(this.name,this.pwd);
        this.http.get(this.constants.BASE_URL+this.constants.LOGIN_URL)
            .subscribe(
                (data)=> this.handleLogin(data),
            );
    }


    logout():void{
        this.alert="";
        this.isAdmin=false;
        this.userService.setUser("","");
    }

    gotoAdmin():void{
        this.router.navigate(["admin"]);
    }

    handleLogin(data):void{
        if(data.status==STATUS.OK) {
            this.isAdmin=true;
            $(this.modal.nativeElement).modal('hide');
        }else if(data.status==STATUS.UNAUTHORIZED){
            this.alert=this.constants.LOGIN_ERROR;
        }else{
            this.alert=this.constants.UNKNOWN_ERROR;
        }
    }


}