import {Component, AfterViewInit, ViewChild, ElementRef, Renderer} from "@angular/core";
import {Constants} from "../services/Constants";
import {UserService} from "../services/user.service";
import {HttpService} from "../services/http.service";
import {STATUS} from "angular-in-memory-web-api";
import {TestRecord} from "./testrecord";
import {Response} from "@angular/http";
import {Route, Router} from "@angular/router";
/**
 * Created by Ken on 11/22/16.
 */



declare var $:any;
@Component({
    selector: 'record',
    templateUrl: 'app/views/new-record.component.html'
})
export class NewRecordComponent implements AfterViewInit{
    @ViewChild('date') dateEle:ElementRef;
    @ViewChild('time') timeEle:ElementRef;
    @ViewChild('uploadSucceed') successModal:ElementRef;
    @ViewChild('newPatient') newPatient:ElementRef;

    mr:string="";
    tests:TestRecord[]=[];
    alert="";
    available=false;

    constructor(private constants:Constants,
                private el: ElementRef,
                private http:HttpService,
                private router:Router){
        for(let test of this.constants.tests){
            this.tests.push(new TestRecord(test.abbr,"",test.hint,test.unit,""));
        }
    }

    testAvailable():void{
        this.http.get(this.constants.BASE_URL+this.constants.DETAIL_URL+"/"+this.mr)
            .subscribe((data) => this.handleTestAvailable(data));
    }

    handleTestAvailable(data:Response):void{
        if(data.status==STATUS.NOT_FOUND){
            $(this.newPatient.nativeElement).modal();
        }else if(data.status==STATUS.OK){
            this.available=true;
        }
    }

    ngAfterViewInit(): void {
        $(this.dateEle.nativeElement).datetimepicker({
            sideBySide:true
        });
        let tooltips=this.el.nativeElement.getElementsByClassName("tooltip-identifier");
        $(tooltips).tooltip();
    }

    submit():void{
        this.alert="";
        if(this.mr.trim()=="" || $(this.timeEle.nativeElement).val().trim()==""){
            this.alert="MR number and date must not be empty.";
            return;
        }
        let values=[];
        let time=Date.parse($(this.timeEle.nativeElement).val());

        for(let test of this.tests){
            if(test.value.trim()!=""){
                values.push({mid:this.constants.getTestByAbbr(test.abbr),testAbbr:test.abbr,value:test.value,time:time});
            }
        }
        if(values.length==0){
            this.alert="No test result is entered.";
            return;
        }
        this.http.put(this.constants.BASE_URL+this.constants.UPLOAD_RECORD_URL+"/"+this.mr,{test:values})
            .subscribe(
                (data) => this.handleSubmit(data)
            );
    }

    handleSubmit(data):void {
        if (data.status != STATUS.OK) {
            this.alert="Upload result failed, please try again.";
            console.error(data);
        } else {
            this.printLabel();
        }
    }

    printLabel():void{
        $(this.successModal.nativeElement).modal();
        setTimeout(() => this.onLablePrinted()
            ,5000);
    }

    onLablePrinted():void{
        $(this.successModal.nativeElement).modal('hide');
        this.router.navigate(["/"]);
    }

    addPatient():void{
        $(this.newPatient.nativeElement).modal('hide');
    }


}

