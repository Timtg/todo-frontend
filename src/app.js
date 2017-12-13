import {PLATFORM} from "aurelia-pal";

export class App {

	configureRouter(config, router) {
		this.router = router;

		config.title = "TodoApp";
		config.map([
			{ route: ["", "home"], name: "home", moduleId: PLATFORM.moduleName("./home"), nav: true, title: "Home" }
		]);
	}
}
