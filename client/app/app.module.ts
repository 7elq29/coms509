import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HomepageComponent} from "./components/homepage.component";
import {HttpService} from "./services/http.service";
import {UserService} from "./services/user.service";
import {Constants} from "./services/Constants";
import {Test} from "./test/test.service";
import {MockHttp} from "./test/mock-http.service";
import {RouterModule} from "@angular/router";
import {SearchComponent} from "./components/search.component";
import {AppComponent} from "./app.component";
import {NewRecordComponent} from "./components/new-record.component";
import {NavBarComponent} from "./components/navbar.component";
import {DetailComponent} from "./components/record-detail.component";
import {AdminComponent} from "./components/new-admin.component";

@NgModule({
    imports: [

        RouterModule.forRoot([
            {
                path:'home',
                component: HomepageComponent
            },
            {
                path:'records/:keyword',
                component: SearchComponent
            },
            {
                path: 'record/new',
                component: NewRecordComponent
            },
            {
                path: 'record/:id',
                component: DetailComponent
            },
            {
                path: 'admin',
                component: AdminComponent
            },
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            }
        ]),
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        HomepageComponent,
        SearchComponent,
        AppComponent,
        NewRecordComponent,
        NavBarComponent,
        DetailComponent,
        AdminComponent
    ],
    providers: [
        HttpService,
        UserService,
        Constants,
        Test,
        MockHttp
    ],
    bootstrap:    [
        AppComponent
    ]
})
export class AppModule { }