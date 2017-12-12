import { Component } from '@angular/core';
import { DoCheck } from '@angular/core';
import { Form } from '@angular/Forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { User } from './user';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [AngularFireDatabase],
	host: {
		'(document:resize)': 'onResize($event)'
	}
})

export class AppComponent implements DoCheck {
	user = new User;
	name: string;
	newItem: any;
	items: FirebaseListObservable<any[]>;
	collection: any;
	old: any;
	constructor(private db: AngularFireDatabase) { }

	display: boolean = false;

	ngDoCheck() {
		if (this.old !== this.collection) {
			this.old = this.collection;
			setTimeout(() => {
				window.scrollTo({ left: 0, top: document.body.clientHeight + 20, behavior: 'smooth' });
			}, 100)
		}
	}

	showDialog() {
		this.display = true;
	}

	registerUser(name) {
		this.user.userName = name;
		this.user.id = Date.now();
		this.user.color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
		localStorage.setItem("session", JSON.stringify(this.user));
		this.display = false;
		this.getChatData();
	}

	ngOnInit() {
		if (!localStorage.getItem("session")) {
			this.display = true;
		} else {
			this.user = JSON.parse(localStorage.getItem("session"));
			this.getChatData();
		}
	}

	getChatData() {
		this.items = this.db.list('chat_messages');
		this.items.subscribe(x => this.collection = x);
	}

	pushData(item) {
		if (item && item != "" && (item.trim()).length > 1)
			this.items.push({
				id: this.user.id,
				userName: this.user.userName,
				color: this.user.color,
				message: item
			});
		this.newItem = "";
	}
}
