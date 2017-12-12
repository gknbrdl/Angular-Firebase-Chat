import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MenuItem } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';

import { AppComponent } from './app.component';

import { environment } from './env';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
		ButtonModule,
		DialogModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }

