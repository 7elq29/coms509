import {Http, Response, ResponseOptions, RequestOptionsArgs} from "@angular/http";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {Test} from "./test.service";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {Constants} from "../services/Constants";
import {Injectable} from "@angular/core";
import {STATUS} from "angular-in-memory-web-api";
/**
 * Created by Ken on 11/21/16.
 */
@Injectable()
export class MockHttp{

    constructor(private test:Test, private constants:Constants){}

    getparams(url:string):any{
        let index=url.indexOf('?');
        if(index<0) return {};
        url=url.substring(index+1);
        let chararray=url.split('');
        let isKey:boolean=true;
        let key="";
        let value="";
        let result={};
        for(let c of chararray){
            if(c=='='){
                isKey=false;
            }else if(c=="&"){
                result[key]=value;
                key="";
                value="";
                isKey=true;
            }else{
                if(isKey) key+=c;
                else if(!isKey) value+=c;
            }
        }
        if(key.length!=0) result[key]=value;
        return result;
    }

    get(url: string, options?: RequestOptionsArgs):Observable<Response>{
        if(url==this.constants.BASE_URL+this.constants.LOGIN_URL){
            return this.doLogin(options);
        }else if(url.startsWith(this.constants.BASE_URL+this.constants.DETAIL_URL+"/")){
            let buffer=url;
            while(buffer.indexOf("/")>=0){
                buffer=buffer.substring(buffer.indexOf('/')+1);
            }
            let mr="";
            if(buffer.indexOf("?")>=0){
                mr=buffer.substring(0,buffer.indexOf("?"));
            }else{
                mr=buffer;
            }
            let params=this.getparams(url);
            return this.doDetail(mr,params.starttime,params.endtime);
        }
        return null;
    }

    post(url:string, body:any, options?: RequestOptionsArgs):Observable<Response>{
        if(url==this.constants.BASE_URL+this.constants.SEARCH_URL){
            return this.doSearch(body);
        }else if(url.startsWith(this.constants.BASE_URL+this.constants.UPLOAD_RECORD_URL+"/")){
            return this.doUpload(body);
        }else if(url.startsWith(this.constants.BASE_URL+this.constants.UPDATE_URL)){

            return this.doChange(body);
        }
        return null;
    }

    put(url:string, body:any, options?: RequestOptionsArgs):Observable<Response>{
        if(url.startsWith(this.constants.BASE_URL+this.constants.UPLOAD_RECORD_URL+"/")){
            return this.doUpload(body);
        }
        return null;
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response>{
        return null;
    }

    doLogin(options?: RequestOptionsArgs):Observable<Response>{
        let token:string=options.headers.get("Authentication");
        let match:boolean=("Basic "+ btoa(this.test.USERNAME+":"+this.test.PWD))==token;
        let response:Response=new Response(
            new ResponseOptions(
                match?
                {
                    body: {
                        status: 'success'
                    },
                    status: STATUS.OK
                }:
                {
                    status: STATUS.UNAUTHORIZED
                }
            ));
        let subject = new BehaviorSubject<Response>(response);
        let observalble = subject.asObservable();
        return observalble;
    }

    doSearch(body:any):Observable<Response>{
        let data=[
            {patientName:'Little puppy',MRNo:'875630984'},
            {patientName:'Big puppy',MRNo:'0375946295837'},
            {patientName:'Giant puppy',MRNo:'847670987453'},
            {patientName:'Tiny puppy',MRNo:'394870921333'},
            {patientName:'Pretty puppy',MRNo:'4847362517893'},
            {patientName:'Ugly puppy',MRNo:'0099483727638'}];
        let keyword=body.keyword;
        let response:Response=new Response(
            new ResponseOptions(
                keyword=='puppy'?
                {
                    body: {
                        result:data
                    },
                    status: STATUS.OK
                }:
                {
                    body:{
                        result:[]
                    },
                    status:STATUS.OK
                }
            ));
        let subject = new BehaviorSubject<Response>(response);
        let observalble = subject.asObservable();
        return observalble;
    }

    doUpload(body:any):Observable<Response>{
        let response:Response=new Response(
            new ResponseOptions(
                {
                    body: {
                        status: 'success'
                    },
                    status: STATUS.OK
               }
            ));
        let subject = new BehaviorSubject<Response>(response);
        let observalble = subject.asObservable();
        return observalble;
    }

    doDetail(mr:string,start:string,end:string):Observable<Response>{
        let alltests=[
            {testAbbr: 'PCV', unit: '%', value:'0.5',time:Date.parse("11/12/2016 2:02 PM")},
            {testAbbr: 'Glu', unit: 'mg/dl', value:'88',time:Date.parse("11/12/2016 2:02 PM")},
            {testAbbr: 'Lac', unit: 'mmol/dl', value:'low',time:Date.parse("11/12/2016 3:42 PM")},
            {testAbbr: 'Lac', unit: 'mmol/dl', value:'48',time:Date.parse("10/1/2016 3:42 PM")},
        ];
        let test=[];
        if(start==null || end==null){
            test=alltests;
        }else{
            for(let t of alltests){
                if(Number(t.time)>=Number(start) && Number(t.time)<=Number(end)){
                    test.push(t);
                }
            }
        }
        let response:Response=new Response(
            new ResponseOptions(
                (mr!="123456" && mr!='puppy')?
                {
                    body: {
                        MRNo: '1234567890',
                        patientName: 'puppy',
                        ownerName: 'Adam',
                        tests: test
                    },
                    status: STATUS.OK
                }:
                {
                    status: STATUS.NOT_FOUND
                }
            ));
        let subject = new BehaviorSubject<Response>(response);
        let observalble = subject.asObservable();
        return observalble;
    }

    doChange(body:any):Observable<Response>{
        let response:Response=new Response(
            new ResponseOptions(
                {
                    body: {
                        status: 'success'
                    },
                    status: STATUS.OK
                }
            ));
        let subject = new BehaviorSubject<Response>(response);
        let observalble = subject.asObservable();
        return observalble;
    }
}