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
/**
 * Created by Ken on 11/26/16.
 */
var AdminComponent = (function () {
    function AdminComponent() {
        this.admins = [];
        this.newAdmin = "";
        this.admins = ["Admin", "John", "Stone"];
    }
    AdminComponent.prototype.add = function () {
        if (this.newAdmin.trim() != "") {
            this.admins.push(this.newAdmin);
        }
        this.newAdmin = "";
    };
    AdminComponent.prototype.remove = function (admin) {
        var index = this.admins.indexOf(admin);
        if (index > -1) {
            this.admins.splice(index, 1);
        }
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'admin',
            templateUrl: 'app/views/new-admin.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=new-admin.component.js.map