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
 * Created by Ken on 11/19/16.
 */
var core_1 = require("@angular/core");
var http_service_1 = require("../services/http.service");
var Constants_1 = require("../services/Constants");
var user_service_1 = require("../services/user.service");
var router_1 = require("@angular/router");
var HomepageComponent = (function () {
    function HomepageComponent(http, constants, userService, router) {
        this.http = http;
        this.constants = constants;
        this.userService = userService;
        this.router = router;
        this.keyword = "";
    }
    HomepageComponent.prototype.search = function () {
        this.router.navigate(['/records', this.keyword]);
    };
    HomepageComponent.prototype.newRecord = function () {
        this.router.navigate(['/record/new']);
    };
    HomepageComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/views/homepage.component.html'
        }), 
        __metadata('design:paramtypes', [http_service_1.HttpService, Constants_1.Constants, user_service_1.UserService, router_1.Router])
    ], HomepageComponent);
    return HomepageComponent;
}());
exports.HomepageComponent = HomepageComponent;
//# sourceMappingURL=homepage.component.js.map