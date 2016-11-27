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
var router_1 = require("@angular/router");
var http_service_1 = require("../services/http.service");
var Constants_1 = require("../services/Constants");
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var testrecord_1 = require("./testrecord");
require("moment/moment");
var user_service_1 = require("../services/user.service");
var DetailComponent = (function () {
    function DetailComponent(route, http, constant, router, userService) {
        var _this = this;
        this.route = route;
        this.http = http;
        this.constant = constant;
        this.router = router;
        this.userService = userService;
        this.table = {};
        this.schedule = [];
        this.alert = "";
        this.changed = [];
        this.route.params.subscribe(function (params) { return _this.id = params["id"]; });
        this.tests = this.constant.tests;
    }
    DetailComponent.prototype.ngAfterViewInit = function () {
        $(this.fromdate.nativeElement).datetimepicker({
            sideBySide: true
        });
        $(this.todate.nativeElement).datetimepicker({
            sideBySide: true
        });
        this.search("", "");
    };
    DetailComponent.prototype.doSearch = function () {
        var from = Date.parse($(this.frominput.nativeElement).val()) / 1000;
        var end = Date.parse($(this.toinput.nativeElement).val()) / 1000;
        this.search(from + "", end + "");
    };
    DetailComponent.prototype.search = function (start, end) {
        var _this = this;
        if (start == null || start == "" || end == null || end == "") {
            this.http.get(this.constant.BASE_URL + this.constant.DETAIL_URL + "/" + this.id)
                .subscribe(function (data) { return _this.handle(data); });
        }
        else {
            this.http.get(this.constant.BASE_URL + this.constant.DETAIL_URL + "/" + this.id + "?starttime=" + start + "&endtime=" + end)
                .subscribe(function (data) { return _this.handle(data); });
        }
    };
    DetailComponent.prototype.isAdmin = function () {
        if (this.userService.getUser() == null)
            return false;
        return true;
    };
    DetailComponent.prototype.handle = function (response) {
        this.table = {};
        this.schedule = [];
        if (response.status != angular_in_memory_web_api_1.STATUS.OK) {
            this.router.navigate(["/"]);
        }
        else {
            var data = response.json();
            this.id = data.MRNo;
            this.name = data.patientName;
            this.ownerName = data.ownerName;
            for (var _i = 0, _a = data.tests; _i < _a.length; _i++) {
                var test = _a[_i];
                var date = new Date(test.time);
                if (this.table[date] == null) {
                    this.table[date] = {};
                    this.schedule.push(date);
                }
                this.table[date][test.testAbbr] = new testrecord_1.TestRecord(test.testAbbr, test.value, "", test.unit, date);
            }
        }
        this.schedule = this.schedule.sort(function (n1, n2) { return n2.getUTCMilliseconds() - n1.getUTCMilliseconds(); });
    };
    DetailComponent.prototype.goHome = function () {
        this.router.navigate(['']);
    };
    DetailComponent.prototype.formatTime = function (timestamp) {
        var date = new Date(timestamp * 1000);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    };
    DetailComponent.prototype.showModal = function (time, abbr) {
        if (!this.isAdmin())
            return;
        this.currentTime = time;
        this.currentAbbr = abbr;
        $(this.changeModal.nativeElement).modal();
    };
    DetailComponent.prototype.change = function () {
        var _this = this;
        if (this.currentTime == null || this.currentAbbr == null
            || this.table[this.currentTime] == null) {
            return;
        }
        if (this.table[this.currentTime][this.currentAbbr] == null) {
            this.table[this.currentTime][this.currentAbbr] = new testrecord_1.TestRecord(this.currentAbbr, this.currentValue, "", "", this.currentTime);
        }
        else {
            this.table[this.currentTime][this.currentAbbr].value = this.currentValue;
        }
        this.changed.push(this.table[this.currentTime][this.currentAbbr]);
        var data = {
            MRNo: this.id,
            test: []
        };
        for (var _i = 0, _a = this.changed; _i < _a.length; _i++) {
            var test = _a[_i];
            data.test.push({
                mid: this.constant.getTestByAbbr(test.abbr),
                testAbbr: test.abbr,
                value: test.value,
                time: test.time
            });
        }
        this.http.post(this.constant.BASE_URL + this.constant.UPDATE_URL, data)
            .subscribe(function (data) { return _this.handleUpdate(data); });
        this.currentValue = "";
        this.currentAbbr = "";
        this.currentTime = null;
    };
    DetailComponent.prototype.handleUpdate = function (data) {
        if (data.status != angular_in_memory_web_api_1.STATUS.OK) {
            this.alert = "Upload result failed, please try again.";
        }
        else {
            $(this.changeModal.nativeElement).modal('hide');
        }
    };
    DetailComponent.prototype.print = function () {
        window.print();
    };
    __decorate([
        core_1.ViewChild('fromdate'), 
        __metadata('design:type', core_1.ElementRef)
    ], DetailComponent.prototype, "fromdate", void 0);
    __decorate([
        core_1.ViewChild('todate'), 
        __metadata('design:type', core_1.ElementRef)
    ], DetailComponent.prototype, "todate", void 0);
    __decorate([
        core_1.ViewChild('frominput'), 
        __metadata('design:type', core_1.ElementRef)
    ], DetailComponent.prototype, "frominput", void 0);
    __decorate([
        core_1.ViewChild('toinput'), 
        __metadata('design:type', core_1.ElementRef)
    ], DetailComponent.prototype, "toinput", void 0);
    __decorate([
        core_1.ViewChild('changeValue'), 
        __metadata('design:type', core_1.ElementRef)
    ], DetailComponent.prototype, "changeModal", void 0);
    DetailComponent = __decorate([
        core_1.Component({
            selector: 'detail',
            templateUrl: 'app/views/record-detail.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_service_1.HttpService, Constants_1.Constants, router_1.Router, user_service_1.UserService])
    ], DetailComponent);
    return DetailComponent;
}());
exports.DetailComponent = DetailComponent;
//# sourceMappingURL=record-detail.component.js.map