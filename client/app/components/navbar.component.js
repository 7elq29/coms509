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
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var Constants_1 = require("../services/Constants");
var http_service_1 = require("../services/http.service");
var user_service_1 = require("../services/user.service");
var router_1 = require("@angular/router");
var NavBarComponent = (function () {
    function NavBarComponent(http, constants, userService, router) {
        this.http = http;
        this.constants = constants;
        this.userService = userService;
        this.router = router;
        this.isAdmin = false;
    }
    NavBarComponent.prototype.ngOnInit = function () {
        if (this.userService.getUser() != null)
            this.isAdmin = true;
    };
    NavBarComponent.prototype.login = function () {
        var _this = this;
        this.alert = "";
        this.isAdmin = false;
        this.userService.setUser(this.name, this.pwd);
        this.http.get(this.constants.BASE_URL + this.constants.LOGIN_URL)
            .subscribe(function (data) { return _this.handleLogin(data); });
    };
    NavBarComponent.prototype.logout = function () {
        this.alert = "";
        this.isAdmin = false;
        this.userService.setUser("", "");
    };
    NavBarComponent.prototype.gotoAdmin = function () {
        this.router.navigate(["admin"]);
    };
    NavBarComponent.prototype.handleLogin = function (data) {
        if (data.status == angular_in_memory_web_api_1.STATUS.OK) {
            this.isAdmin = true;
            $(this.modal.nativeElement).modal('hide');
        }
        else if (data.status == angular_in_memory_web_api_1.STATUS.UNAUTHORIZED) {
            this.alert = this.constants.LOGIN_ERROR;
        }
        else {
            this.alert = this.constants.UNKNOWN_ERROR;
        }
    };
    __decorate([
        core_1.ViewChild('loginForm'), 
        __metadata('design:type', core_1.ElementRef)
    ], NavBarComponent.prototype, "modal", void 0);
    NavBarComponent = __decorate([
        core_1.Component({
            selector: 'navbar',
            templateUrl: 'app/views/navbar.component.html'
        }), 
        __metadata('design:paramtypes', [http_service_1.HttpService, Constants_1.Constants, user_service_1.UserService, router_1.Router])
    ], NavBarComponent);
    return NavBarComponent;
}());
exports.NavBarComponent = NavBarComponent;
//# sourceMappingURL=navbar.component.js.map