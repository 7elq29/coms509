/**
 * Created by Ken on 11/26/16.
 */
export class TestRecord{
    abbr:string;
    value:string;
    hint:string;
    unit:string;
    time:Date;

    constructor(abbr:string, value:string, hint:string, unit:string, time:Date){
        this.abbr=abbr;
        this.value=value;
        this.hint=hint;
        this.unit=unit;
        this.time=time;
    }
}