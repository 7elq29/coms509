import {Component} from "@angular/core";
/**
 * Created by Ken on 11/26/16.
 */
@Component({
    selector: 'admin',
    templateUrl: 'app/views/new-admin.component.html'
})
export class AdminComponent{
    admins:string[]=[];
    newAdmin:string="";

    constructor(){
        this.admins=["Admin","John","Stone"];
    }

    add():void{
        if(this.newAdmin.trim()!=""){
            this.admins.push(this.newAdmin);
        }
        this.newAdmin="";
    }

    remove(admin):void{
        let index = this.admins.indexOf(admin);
        if (index > -1) {
            this.admins.splice(index, 1);
        }
    }
}