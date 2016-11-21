import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HomepageComponent} from "./components/homepage.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        HomepageComponent
    ],
    bootstrap:    [
        HomepageComponent
    ]
})
export class AppModule { }