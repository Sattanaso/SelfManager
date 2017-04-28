'use strict';

const mainCtrl = (() => {
	class MainCtrl {
		showHome() {
			view.home('#content', {})
		}

		showTodos() {
			let todoz = (() => {
				return () => {
					if (!localStorage.getItem('username')) {
						notifier.warningNo('Please, sign in!');
						return;
					}
					data.getTodos()
						.then((todos) => {
							if (todos.result.length === 0) {
								notifier.warningNo('You have no TODOs!');
							}
							view.todos('#content', { data: todos.result })
						})
						.catch((err) => {
							console.log(err);
						})
				}
			})();

			todoz();

			$('#todoz').on('click', () => {
				todoz();
			})
		}

		singleTodo(id) {
			data.getTodoById(id)
				.then((todo) => {
					view.singleTodo('#content', { data: todo.result })
				})
				.catch((err) => {
					console.log(err);
				})
		}

		addTodo() {
			view.addTodo('#content', {});

			$('.btn #add-todo-btn').on('click', () => {
				let todoObj = {
					category: $('#add-todo-category').html(),
					text: $('#add-todo-text').html(),
					state: $('#add-todo-state').html()
				}
				console.log(todoObj);
			})
		}

		showEvents() {
			let eventz = (() => {
				return () => {
					if (!localStorage.getItem('username')) {
						notifier.warningNo('Please, sign in!');
						return;
					}
					data.getEvents()
						.then((events) => {
							if (events.result.length === 0) {
								notifier.info('You have no EVENTs!');
							}
							view.events('#content', { data: events.result })
						})
						.catch((err) => {
							console.log(err);
						})
				}
			})();

			eventz();

			$('#eventz').on('click', () => {
				eventz();
			})
		}

		addEvent() {
			return view.addEvent('#content', {});
		}

	}

	let newCtrl = new MainCtrl();
	return newCtrl;
})()
