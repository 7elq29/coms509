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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var homepage_component_1 = require("./components/homepage.component");
var http_service_1 = require("./services/http.service");
var user_service_1 = require("./services/user.service");
var Constants_1 = require("./services/Constants");
var test_service_1 = require("./test/test.service");
var mock_http_service_1 = require("./test/mock-http.service");
var router_1 = require("@angular/router");
var search_component_1 = require("./components/search.component");
var app_component_1 = require("./app.component");
var new_record_component_1 = require("./components/new-record.component");
var navbar_component_1 = require("./components/navbar.component");
var record_detail_component_1 = require("./components/record-detail.component");
var new_admin_component_1 = require("./components/new-admin.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot([
                    {
                        path: 'home',
                        component: homepage_component_1.HomepageComponent
                    },
                    {
                        path: 'records/:keyword',
                        component: search_component_1.SearchComponent
                    },
                    {
                        path: 'record/new',
                        component: new_record_component_1.NewRecordComponent
                    },
                    {
                        path: 'record/:id',
                        component: record_detail_component_1.DetailComponent
                    },
                    {
                        path: 'admin',
                        component: new_admin_component_1.AdminComponent
                    },
                    {
                        path: '',
                        redirectTo: '/home',
                        pathMatch: 'full'
                    }
                ]),
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule
            ],
            declarations: [
                homepage_component_1.HomepageComponent,
                search_component_1.SearchComponent,
                app_component_1.AppComponent,
                new_record_component_1.NewRecordComponent,
                navbar_component_1.NavBarComponent,
                record_detail_component_1.DetailComponent,
                new_admin_component_1.AdminComponent
            ],
            providers: [
                http_service_1.HttpService,
                user_service_1.UserService,
                Constants_1.Constants,
                test_service_1.Test,
                mock_http_service_1.MockHttp
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map