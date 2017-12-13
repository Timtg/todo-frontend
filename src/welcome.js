import {inject, Lazy} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";

const fetch = !self.fetch ? System.import("isomorphic-fetch") : Promise.resolve(self.fetch);

@inject(Lazy.of(HttpClient))
export class Welcome {
	todoElements =  [];

	constructor(getHttpClient) {
		this.getHttpClient = getHttpClient;
	}

	async activate() {
		// ensure fetch is polyfilled before we create the http client
		await fetch;
		const http = this.http = this.getHttpClient();

		http.configure(config => {
			config
				.useStandardConfiguration()
				.withBaseUrl("http://localhost:8081/api/todo");
		});

		const response = await http.fetch("");
		this.todoElements = await response.json();
		console.log(this.todoElements);
	}

}
