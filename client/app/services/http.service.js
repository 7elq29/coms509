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
 * Created by Ken on 11/10/16.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var user_service_1 = require("./user.service");
var mock_http_service_1 = require("../test/mock-http.service");
var HttpService = (function () {
    function HttpService(userService, ngHttp, mockHttp) {
        this.userService = userService;
        this.ngHttp = ngHttp;
        this.mockHttp = mockHttp;
        this.http = ngHttp;
    }
    HttpService.prototype.mock = function () {
        this.http = this.mockHttp;
    };
    HttpService.prototype.get = function (url) {
        return this.http.get(url, { headers: this.composeHead() });
    };
    HttpService.prototype.post = function (url, body) {
        return this.http.post(url, body, { headers: this.composeHead() });
    };
    HttpService.prototype.put = function (url, body) {
        return this.http.put(url, body, { headers: this.composeHead() });
    };
    HttpService.prototype.delete = function (url) {
        return this.http.delete(url, { headers: this.composeHead() });
    };
    HttpService.prototype.composeHead = function () {
        if (this.userService.getUser() == null) {
            return null;
        }
        var headers = new http_1.Headers();
        headers.append("Authentication", "Basic " + this.userService.getUser().getToken());
        return headers;
    };
    HttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [user_service_1.UserService, http_1.Http, mock_http_service_1.MockHttp])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map