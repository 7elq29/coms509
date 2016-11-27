"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Constants_1 = require("../services/Constants");
var http_service_1 = require("../services/http.service");
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var testrecord_1 = require("./testrecord");
var router_1 = require("@angular/router");
var NewRecordComponent = (function () {
    function NewRecordComponent(constants, el, http, router) {
        this.constants = constants;
        this.el = el;
        this.http = http;
        this.router = router;
        this.mr = "";
        this.tests = [];
        this.alert = "";
        this.available = false;
        for (var _i = 0, _a = this.constants.tests; _i < _a.length; _i++) {
            var test = _a[_i];
            this.tests.push(new testrecord_1.TestRecord(test.abbr, "", test.hint, test.unit, ""));
        }
    }
    NewRecordComponent.prototype.testAvailable = function () {
        var _this = this;
        this.http.get(this.constants.BASE_URL + this.constants.DETAIL_URL + "/" + this.mr)
            .subscribe(function (data) { return _this.handleTestAvailable(data); });
    };
    NewRecordComponent.prototype.handleTestAvailable = function (data) {
        if (data.status == angular_in_memory_web_api_1.STATUS.NOT_FOUND) {
            $(this.newPatient.nativeElement).modal();
        }
        else if (data.status == angular_in_memory_web_api_1.STATUS.OK) {
            this.available = true;
        }
    };
    NewRecordComponent.prototype.ngAfterViewInit = function () {
        $(this.dateEle.nativeElement).datetimepicker({
            sideBySide: true
        });
        var tooltips = this.el.nativeElement.getElementsByClassName("tooltip-identifier");
        $(tooltips).tooltip();
    };
    NewRecordComponent.prototype.submit = function () {
        var _this = this;
        this.alert = "";
        if (this.mr.trim() == "" || $(this.timeEle.nativeElement).val().trim() == "") {
            this.alert = "MR number and date must not be empty.";
            return;
        }
        var values = [];
        var time = Date.parse($(this.timeEle.nativeElement).val()) / 1000;
        for (var _i = 0, _a = this.tests; _i < _a.length; _i++) {
            var test = _a[_i];
            if (test.value.trim() != "") {
                values.push({ mid: this.constants.getTestByAbbr(test.abbr), testAbbr: test.abbr, value: test.value, time: time });
            }
        }
        if (values.length == 0) {
            this.alert = "No test result is entered.";
            return;
        }
        this.http.put(this.constants.BASE_URL + this.constants.UPLOAD_RECORD_URL + "/" + this.mr, { test: values })
            .subscribe(function (data) { return _this.handleSubmit(data); });
    };
    NewRecordComponent.prototype.handleSubmit = function (data) {
        if (data.status != angular_in_memory_web_api_1.STATUS.OK) {
            this.alert = "Upload result failed, please try again.";
            console.error(data);
        }
        else {
            this.printLabel();
        }
    };
    NewRecordComponent.prototype.printLabel = function () {
        var _this = this;
        $(this.successModal.nativeElement).modal();
        setTimeout(function () { return _this.onLablePrinted(); }, 5000);
    };
    NewRecordComponent.prototype.onLablePrinted = function () {
        $(this.successModal.nativeElement).modal('hide');
        this.router.navigate(["/"]);
    };
    NewRecordComponent.prototype.addPatient = function () {
        $(this.newPatient.nativeElement).modal('hide');
    };
    __decorate([
        core_1.ViewChild('date'), 
        __metadata('design:type', core_1.ElementRef)
    ], NewRecordComponent.prototype, "dateEle", void 0);
    __decorate([
        core_1.ViewChild('time'), 
        __metadata('design:type', core_1.ElementRef)
    ], NewRecordComponent.prototype, "timeEle", void 0);
    __decorate([
        core_1.ViewChild('uploadSucceed'), 
        __metadata('design:type', core_1.ElementRef)
    ], NewRecordComponent.prototype, "successModal", void 0);
    __decorate([
        core_1.ViewChild('newPatient'), 
        __metadata('design:type', core_1.ElementRef)
    ], NewRecordComponent.prototype, "newPatient", void 0);
    NewRecordComponent = __decorate([
        core_1.Component({
            selector: 'record',
            templateUrl: 'app/views/new-record.component.html'
        }), 
        __metadata('design:paramtypes', [Constants_1.Constants, core_1.ElementRef, http_service_1.HttpService, router_1.Router])
    ], NewRecordComponent);
    return NewRecordComponent;
}());
exports.NewRecordComponent = NewRecordComponent;
//# sourceMappingURL=new-record.component.js.map