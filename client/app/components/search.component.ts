/**
 * Created by Ken on 11/22/16.
 */
import {Component, OnInit} from "@angular/core";
import {Router, Route, Params, ActivatedRoute} from "@angular/router";
import {HttpService} from "../services/http.service";
import {Constants} from "../services/Constants";
import {Response} from "@angular/http";
import {STATUS} from "angular-in-memory-web-api";
import {Observable} from "rxjs/Observable";


export class SearchResult{
    name:string;
    mr:string;

    constructor(mr:string,name:string){
        this.mr=mr;
        this.name=name;
    }
}

@Component({
    selector: 'search',
    templateUrl: 'app/views/search.component.html'
})
export class SearchComponent implements OnInit{
    keyword:string="";
    buffer:string="";
    results:SearchResult[]=[];

    constructor(private route:ActivatedRoute,
                private http:HttpService,
                private constants:Constants,
                private router:Router){}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => this.keyword=params["keyword"]);
        this.buffer=this.keyword;
        this.search();
    }

    search():void{
        this.keyword=this.buffer;
        this.results=[];

        this.http.get(this.constants.BASE_URL+this.constants.DETAIL_URL+"/"+this.keyword)
            .catch((data) => this.handleError(data))
            .subscribe((data) => this.handle(data));
    }

    handleError(response:Response | any){
        if (response.status == STATUS.OK) {
            this.router.navigate(["/record",this.keyword]);
        } else {
            this.http.post(this.constants.BASE_URL+this.constants.SEARCH_URL,{keyword:this.keyword})
                .subscribe(
                    (data) => this.handleSearch(data)
                )
        }
    }

    handle(response:Response) {
        if (response.status == STATUS.OK) {
            this.router.navigate(["/record",this.keyword]);
        } else {
            this.http.post(this.constants.BASE_URL+this.constants.SEARCH_URL,{keyword:this.keyword})
                .subscribe(
                    (data) => this.handleSearch(data)
                )
        }
    }

    handleSearch(data:Response):void{
        if(data.status!=STATUS.OK){
            console.error(data.statusText);
        }else{
            let arr=data.json().result;
            for(let item of arr){
                this.results.push(new SearchResult(item.MRNo,item.patientName));
            }
        }
    }

    gotoDetail(mr:string):void{
        this.router.navigate(["/record", mr]);
    }

}