import {inject, Lazy, bindable} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";

const fetch = !self.fetch ? System.import("isomorphic-fetch") : Promise.resolve(self.fetch);

@inject(Lazy.of(HttpClient))
export class Welcome {
	todoElements = [];
	@bindable newTodoBody;

	constructor(getHttpClient) {
		this.getHttpClient = getHttpClient;
	}

	async activate() {
		// ensure fetch is polyfilled before we create the http client
		this.reloadTodoList();
	}

	async reloadTodoList() {
		await fetch;
		const http = this.http = this.getHttpClient();

		http.configure(config => {
			config
				.useStandardConfiguration()
				.withBaseUrl("http://localhost:8081/api/todo");
		});

		const response = await http.fetch("");
		this.todoElements = await response.json();
	}

	showCategories(todoElement) {
		todoElement.showCategories = !todoElement.showCategories;
	}

	async removeTodo(todoElementId) {
		const http = this.http = this.getHttpClient();

		http.configure(config => {
			config
				.useStandardConfiguration()
				.withBaseUrl("http://localhost:8081/api/todo");
		});

		await http.fetch(`/${todoElementId}`, {
			method: "put"
		});

		this.reloadTodoList();
	}

	async addNewTodoElement() {
		const http = this.http = this.getHttpClient();

		http.configure(config => {
			config
				.useStandardConfiguration()
				.withBaseUrl("http://localhost:8081/api/todo");
		});

		const todoElement = {
			body: this.newTodoBody
		};

		if (this.newTodoBody !== "") {
			await http.fetch("", {
				method: "post",
				body: json(todoElement)
			});
		}

		this.newTodoBody = "";
		this.reloadTodoList();
	}

}
