import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpService} from "../services/http.service";
import {Constants} from "../services/Constants";
import {STATUS} from "angular-in-memory-web-api";
import {Response} from "@angular/http";
import {TestRecord} from "./testrecord";
import "moment/moment";
import {UserService} from "../services/user.service";
/**
 * Created by Ken on 11/26/16.
 */

declare var $:any;
@Component({
    selector: 'detail',
    templateUrl: 'app/views/record-detail.component.html',
})
export class DetailComponent implements AfterViewInit{
    @ViewChild('fromdate') fromdate:ElementRef;
    @ViewChild('todate') todate:ElementRef;
    @ViewChild('frominput') frominput:ElementRef;
    @ViewChild('toinput') toinput:ElementRef;
    @ViewChild('changeValue') changeModal:ElementRef;
    id: string;
    name: string;
    ownerName: string;
    table={};
    tests:any;
    schedule:Date[]=[];
    alert:string="";

    currentTime:Date;
    currentAbbr:string;
    currentValue:string;
    changed:TestRecord[]=[];


    constructor(private route:ActivatedRoute,
                private http:HttpService,
                private constant:Constants,
                private router:Router,
                private userService:UserService){
        this.route.params.subscribe((params: Params) => this.id=params["id"]);
        this.tests=this.constant.tests;
    }

    ngAfterViewInit(): void {
        $(this.fromdate.nativeElement).datetimepicker({
            sideBySide:true
        });
        $(this.todate.nativeElement).datetimepicker({
            sideBySide:true
        });
        this.search("","");
    }

    doSearch(){
        let from=Date.parse($(this.frominput.nativeElement).val())/1000;
        let end=Date.parse($(this.toinput.nativeElement).val())/1000;
        this.search(from+"",end+"");
    }

    search(start:string,end:string){
        if(start==null || start=="" || end==null || end==""){
            this.http.get(this.constant.BASE_URL+this.constant.DETAIL_URL+"/"+this.id)
                .subscribe((data) => this.handle(data));
        }else{
            this.http.get(this.constant.BASE_URL+this.constant.DETAIL_URL+"/"+this.id+"?starttime="+start+"&endtime="+end)
                .subscribe((data) => this.handle(data));
        }
    }

    isAdmin():boolean{
        if(this.userService.getUser()==null) return false;
        return true;
    }

    handle(response:Response):void{
        this.table={};
        this.schedule=[];
        if(response.status!=STATUS.OK){
            this.router.navigate(["/"]);
        }else{
            let data=response.json();
            this.id=data.MRNo;
            this.name=data.patientName;
            this.ownerName=data.ownerName;
            for(let test of data.tests){
                let date=new Date(test.time);
                if(this.table[date]==null){
                    this.table[date]={};
                    this.schedule.push(date);
                }
                this.table[date][test.testAbbr]=new TestRecord(test.testAbbr,test.value,"",test.unit,date);
            }
        }
        this.schedule = this.schedule.sort((n1:Date,n2:Date)=> n2.getUTCMilliseconds()-n1.getUTCMilliseconds());
    }

    formatTime(timestamp):string{
        let date=new Date(timestamp*1000);
        return date.toLocaleDateString()+" "+date.toLocaleTimeString();
    }

    showModal(time,abbr):void{
        if(!this.isAdmin()) return;
        this.currentTime=time;
        this.currentAbbr=abbr;
        $(this.changeModal.nativeElement).modal();
    }

    change():void{
        if(this.currentTime==null || this.currentAbbr==null
            || this.table[this.currentTime]==null){
            return;
        }
        if(this.table[this.currentTime][this.currentAbbr]==null){
            this.table[this.currentTime][this.currentAbbr]=new TestRecord(this.currentAbbr, this.currentValue,"","",this.currentTime);
        }else {
            this.table[this.currentTime][this.currentAbbr].value = this.currentValue;
        }
        this.changed.push(this.table[this.currentTime][this.currentAbbr]);
        let data= {
            MRNo: this.id,
            test: []
        };
        for(let test of this.changed){
            data.test.push({
                mid: this.constant.getTestByAbbr(test.abbr),
                testAbbr: test.abbr,
                value: test.value,
                time: test.time
            });
        }
        this.http.post(this.constant.BASE_URL+this.constant.UPDATE_URL,data)
            .subscribe((data)=>this.handleUpdate(data));
        this.currentValue="";
        this.currentAbbr="";
        this.currentTime=null;
    }

    handleUpdate(data:Response):void{
        if (data.status != STATUS.OK) {
            this.alert="Upload result failed, please try again.";
        } else {
            $(this.changeModal.nativeElement).modal('hide');
        }
    }

    print():void{
        window.print();
    }

}
