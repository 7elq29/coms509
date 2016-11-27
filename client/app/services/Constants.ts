
import {Injectable} from "@angular/core";
/**
 * Created by Ken on 11/21/16.
 */
@Injectable()
export class Constants{
    public BASE_URL:string = "http://127.0.0.1:5000";
    public LOGIN_URL:string = "/login";
    public SEARCH_URL:string = "/search";
    public UPLOAD_RECORD_URL:string = "/add";
    public DETAIL_URL:string = "/searchByMR";
    public UPDATE_URL:string = "/update";

    public LOGIN_ERROR:string="Username or password is incorrect";
    public UNKNOWN_ERROR:string="Oops, some problem occurs. Please try again.";

    public tests=[
        {mid:'1', name:"Packed Cell Volumn", abbr:"PCV",unit:"%",hint:"ex. 65%"},
        {mid:'2', name:"Total Protein", abbr:"TP",unit:"g/dl",hint:"From 0.0 to 13.0. ex. 5.0"},
        {mid:'3', name:"Azostix", abbr:"Azo",unit:"mg/dl",hint:"{min value}-{max value}.  ex. 13-78"},
        {mid:'4', name:"Glucose", abbr:"Glu",unit:"mg/dl",hint:"Whole number or 'low' or 'high'"},
        {mid:'5', name:"Lactate", abbr:"Lac",unit:"mmol/dl",hint:"Whole number or 'low'"},
        {mid:'6', name:"Ketones", abbr:"Ket",unit:"mmol/dl",hint:"Decimal ex. 6.7"},
        {mid:'7', name:"Prothrombin Time", abbr:"PT",unit:"sec",hint:"ex. 23 If the resut is out of range for the analyzer it will read high"},
        {mid:'8', name:"Prothrombin Thromboplastin Time", abbr:"PTT",unit:"sec",hint:"ex. 48 If the resut is out of range for the analyzer it will read high"}
    ];

    getTestByAbbr(abbr:string):any{
        for(let i of this.tests){
            if(i.abbr==abbr){
                return i;
            }
        }
        return null;
    }

}