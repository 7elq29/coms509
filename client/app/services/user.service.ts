/**
 * Created by Ken on 11/21/16.
 */
import {Injectable} from "@angular/core";
export class UserSession{
    private userName:string;
    private token:string;

    constructor(userName:string, pwd:string){
        this.userName=userName;
        this.token=btoa(userName+":"+pwd);

    }
    public getUserName():string{
        return this.userName;
    }

    public getToken():string{
        return this.token;
    }
}

@Injectable()
export class UserService{
    static user:UserSession;

    setUser(user:string,pwd:string):void{
        UserService.user=new UserSession(user,pwd);
    }

    getUser():UserSession{
        return UserService.user;
    }
}