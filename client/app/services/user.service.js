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
 * Created by Ken on 11/21/16.
 */
var core_1 = require("@angular/core");
var UserSession = (function () {
    function UserSession(userName, pwd) {
        this.userName = userName;
        this.token = btoa(userName + ":" + pwd);
    }
    UserSession.prototype.getUserName = function () {
        return this.userName;
    };
    UserSession.prototype.getToken = function () {
        return this.token;
    };
    return UserSession;
}());
exports.UserSession = UserSession;
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.setUser = function (user, pwd) {
        UserService.user = new UserSession(user, pwd);
    };
    UserService.prototype.getUser = function () {
        return UserService.user;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map