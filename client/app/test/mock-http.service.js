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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var test_service_1 = require("./test.service");
var Constants_1 = require("../services/Constants");
var core_1 = require("@angular/core");
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
/**
 * Created by Ken on 11/21/16.
 */
var MockHttp = (function () {
    function MockHttp(test, constants) {
        this.test = test;
        this.constants = constants;
    }
    MockHttp.prototype.getparams = function (url) {
        var index = url.indexOf('?');
        if (index < 0)
            return {};
        url = url.substring(index + 1);
        var chararray = url.split('');
        var isKey = true;
        var key = "";
        var value = "";
        var result = {};
        for (var _i = 0, chararray_1 = chararray; _i < chararray_1.length; _i++) {
            var c = chararray_1[_i];
            if (c == '=') {
                isKey = false;
            }
            else if (c == "&") {
                result[key] = value;
                key = "";
                value = "";
                isKey = true;
            }
            else {
                if (isKey)
                    key += c;
                else if (!isKey)
                    value += c;
            }
        }
        if (key.length != 0)
            result[key] = value;
        return result;
    };
    MockHttp.prototype.get = function (url, options) {
        if (url == this.constants.BASE_URL + this.constants.LOGIN_URL) {
            return this.doLogin(options);
        }
        else if (url.startsWith(this.constants.BASE_URL + this.constants.DETAIL_URL + "/")) {
            var buffer = url;
            while (buffer.indexOf("/") >= 0) {
                buffer = buffer.substring(buffer.indexOf('/') + 1);
            }
            var mr = "";
            if (buffer.indexOf("?") >= 0) {
                mr = buffer.substring(0, buffer.indexOf("?"));
            }
            else {
                mr = buffer;
            }
            var params = this.getparams(url);
            return this.doDetail(mr, params.starttime, params.endtime);
        }
        return null;
    };
    MockHttp.prototype.post = function (url, body, options) {
        if (url == this.constants.BASE_URL + this.constants.SEARCH_URL) {
            return this.doSearch(body);
        }
        else if (url.startsWith(this.constants.BASE_URL + this.constants.UPLOAD_RECORD_URL + "/")) {
            return this.doUpload(body);
        }
        else if (url.startsWith(this.constants.BASE_URL + this.constants.UPDATE_URL)) {
            return this.doChange(body);
        }
        return null;
    };
    MockHttp.prototype.put = function (url, body, options) {
        if (url.startsWith(this.constants.BASE_URL + this.constants.UPLOAD_RECORD_URL + "/")) {
            return this.doUpload(body);
        }
        return null;
    };
    MockHttp.prototype.delete = function (url, options) {
        return null;
    };
    MockHttp.prototype.doLogin = function (options) {
        var token = options.headers.get("Authentication");
        var match = ("Basic " + btoa(this.test.USERNAME + ":" + this.test.PWD)) == token;
        var response = new http_1.Response(new http_1.ResponseOptions(match ?
            {
                body: {
                    status: 'success'
                },
                status: angular_in_memory_web_api_1.STATUS.OK
            } :
            {
                status: angular_in_memory_web_api_1.STATUS.UNAUTHORIZED
            }));
        var subject = new Rx_1.BehaviorSubject(response);
        var observalble = subject.asObservable();
        return observalble;
    };
    MockHttp.prototype.doSearch = function (body) {
        var data = [
            { patientName: 'Little puppy', MRNo: '875630984' },
            { patientName: 'Big puppy', MRNo: '0375946295837' },
            { patientName: 'Giant puppy', MRNo: '847670987453' },
            { patientName: 'Tiny puppy', MRNo: '394870921333' },
            { patientName: 'Pretty puppy', MRNo: '4847362517893' },
            { patientName: 'Ugly puppy', MRNo: '0099483727638' }];
        var keyword = body.keyword;
        var response = new http_1.Response(new http_1.ResponseOptions(keyword == 'puppy' ?
            {
                body: {
                    result: data
                },
                status: angular_in_memory_web_api_1.STATUS.OK
            } :
            {
                body: {
                    result: []
                },
                status: angular_in_memory_web_api_1.STATUS.OK
            }));
        var subject = new Rx_1.BehaviorSubject(response);
        var observalble = subject.asObservable();
        return observalble;
    };
    MockHttp.prototype.doUpload = function (body) {
        var response = new http_1.Response(new http_1.ResponseOptions({
            body: {
                status: 'success'
            },
            status: angular_in_memory_web_api_1.STATUS.OK
        }));
        var subject = new Rx_1.BehaviorSubject(response);
        var observalble = subject.asObservable();
        return observalble;
    };
    MockHttp.prototype.doDetail = function (mr, start, end) {
        var alltests = [
            { testAbbr: 'PCV', unit: '%', value: '0.5', time: Date.parse("11/12/2016 2:02 PM") / 1000 },
            { testAbbr: 'Glu', unit: 'mg/dl', value: '88', time: Date.parse("11/12/2016 2:02 PM") / 1000 },
            { testAbbr: 'Lac', unit: 'mmol/dl', value: 'low', time: Date.parse("11/12/2016 3:42 PM") / 1000 },
            { testAbbr: 'Lac', unit: 'mmol/dl', value: '48', time: Date.parse("10/1/2016 3:42 PM") / 1000 },
        ];
        var test = [];
        if (start == null || end == null) {
            test = alltests;
        }
        else {
            for (var _i = 0, alltests_1 = alltests; _i < alltests_1.length; _i++) {
                var t = alltests_1[_i];
                if (t.time >= start && t.time <= end) {
                    test.push(t);
                }
            }
        }
        var response = new http_1.Response(new http_1.ResponseOptions(mr != "123456" ?
            {
                body: {
                    MRNo: '1234567890',
                    patientName: 'puppy',
                    ownerName: 'Adam',
                    tests: test
                },
                status: angular_in_memory_web_api_1.STATUS.OK
            } :
            {
                status: angular_in_memory_web_api_1.STATUS.NOT_FOUND
            }));
        var subject = new Rx_1.BehaviorSubject(response);
        var observalble = subject.asObservable();
        return observalble;
    };
    MockHttp.prototype.doChange = function (body) {
        var response = new http_1.Response(new http_1.ResponseOptions({
            body: {
                status: 'success'
            },
            status: angular_in_memory_web_api_1.STATUS.OK
        }));
        var subject = new Rx_1.BehaviorSubject(response);
        var observalble = subject.asObservable();
        return observalble;
    };
    MockHttp = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [test_service_1.Test, Constants_1.Constants])
    ], MockHttp);
    return MockHttp;
}());
exports.MockHttp = MockHttp;
//# sourceMappingURL=mock-http.service.js.map