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
/**
 * Created by Ken on 11/22/16.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_service_1 = require("../services/http.service");
var Constants_1 = require("../services/Constants");
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var SearchResult = (function () {
    function SearchResult(mr, name) {
        this.mr = mr;
        this.name = name;
    }
    return SearchResult;
}());
exports.SearchResult = SearchResult;
var SearchComponent = (function () {
    function SearchComponent(route, http, constants, router) {
        this.route = route;
        this.http = http;
        this.constants = constants;
        this.router = router;
        this.keyword = "";
        this.buffer = "";
        this.results = [];
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) { return _this.keyword = params["keyword"]; });
        this.buffer = this.keyword;
        this.search();
    };
    SearchComponent.prototype.search = function () {
        var _this = this;
        this.keyword = this.buffer;
        this.results = [];
        this.http.post(this.constants.BASE_URL + this.constants.SEARCH_URL, { keyword: this.keyword })
            .subscribe(function (data) { return _this.handleSearch(data); });
    };
    SearchComponent.prototype.handleSearch = function (data) {
        if (data.status != angular_in_memory_web_api_1.STATUS.OK) {
            console.error(data.statusText);
        }
        else {
            var arr = data.json().result;
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var item = arr_1[_i];
                this.results.push(new SearchResult(item.MRNo, item.patientName));
            }
        }
    };
    SearchComponent.prototype.gotoDetail = function (mr) {
        this.router.navigate(["/record", mr]);
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: 'app/views/search.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_service_1.HttpService, Constants_1.Constants, router_1.Router])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map