/**
 * Created by Ken on 11/10/16.
 */
import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import {UserService} from "./user.service";
import {MockHttp} from "../test/mock-http.service";
@Injectable()
export class HttpService{
    http:any;

    constructor(private userService:UserService, private ngHttp:Http, private mockHttp:MockHttp){
        this.http=ngHttp;
        this.mock();
    }

    mock():void{
        this.http=this.mockHttp;
    }

    get(url: string):Observable<Response>{
        return this.http.get(url,{headers:this.composeHead()});
    }

    post(url:string, body:any):Observable<Response>{
        return this.http.post(url,body,{headers:this.composeHead()});
    }

    put(url:string, body:any):Observable<Response>{
        return this.http.put(url,body,{headers:this.composeHead()});
    }

    delete(url: string): Observable<Response>{
        return this.http.delete(url,{headers:this.composeHead()});
    }

    composeHead():Headers{
        if(this.userService.getUser()==null){ return null; }
        let headers:Headers=new Headers();
        headers.append("Authentication","Basic "+this.userService.getUser().getToken());
        return headers;
    }
}