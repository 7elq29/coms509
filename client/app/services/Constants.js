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
 * Created by Ken on 11/21/16.
 */
var Constants = (function () {
    function Constants() {
        this.BASE_URL = "http://10.26.14.12:5000";
        this.LOGIN_URL = "/login";
        this.SEARCH_URL = "/search";
        this.UPLOAD_RECORD_URL = "/add";
        this.DETAIL_URL = "/searchByMR";
        this.UPDATE_URL = "/update";
        this.ADD_PATIENT = "/addpatient";
        this.LOGIN_ERROR = "Username or password is incorrect";
        this.UNKNOWN_ERROR = "Oops, some problem occurs. Please try again.";
        this.tests = [
            { mid: '1', name: "Packed Cell Volumn", abbr: "PCV", unit: "%", hint: "ex. 65%" },
            { mid: '2', name: "Total Protein", abbr: "TP", unit: "g/dl", hint: "From 0.0 to 13.0. ex. 5.0" },
            { mid: '3', name: "Azostix", abbr: "Azo", unit: "mg/dl", hint: "{min value}-{max value}.  ex. 13-78" },
            { mid: '4', name: "Glucose", abbr: "Glu", unit: "mg/dl", hint: "Whole number or 'low' or 'high'" },
            { mid: '5', name: "Lactate", abbr: "Lac", unit: "mmol/dl", hint: "Whole number or 'low'" },
            { mid: '6', name: "Ketones", abbr: "Ket", unit: "mmol/dl", hint: "Decimal ex. 6.7" },
            { mid: '7', name: "Prothrombin Time", abbr: "PT", unit: "sec", hint: "ex. 23 If the resut is out of range for the analyzer it will read high" },
            { mid: '8', name: "Prothrombin Thromboplastin Time", abbr: "PTT", unit: "sec", hint: "ex. 48 If the resut is out of range for the analyzer it will read high" }
        ];
    }
    Constants.prototype.getTestByAbbr = function (abbr) {
        for (var _i = 0, _a = this.tests; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.abbr == abbr) {
                return i;
            }
        }
        return null;
    };
    Constants = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Constants);
    return Constants;
}());
exports.Constants = Constants;
//# sourceMappingURL=Constants.js.map