/**
 * Created by Ken on 11/19/16.
 */
import {Component} from "@angular/core";
import {HttpService} from "../services/http.service";
import {Constants} from "../services/Constants";
import {UserService} from "../services/user.service";
import {STATUS} from "angular-in-memory-web-api";
import {Router} from "@angular/router";
@Component({
    selector: 'home',
    templateUrl: 'app/views/homepage.component.html'
})
export class HomepageComponent{
    keyword:string="";

    constructor(private http:HttpService,
                private constants:Constants,
                private userService:UserService,
                private router:Router){}


    search():void{
        this.router.navigate(['/records',this.keyword]);
    }

    newRecord():void{
        this.router.navigate(['/record/new']);
    }


}