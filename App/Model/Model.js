class ModelList{
	
	constructor(){
		this.PendingTasks = [];
		this.runningTasks = [];
		this.CompletedTasks = [];
	}

	static eraseFromModel(self, typeOfTask){
		let id = self.getAttribute('id');

		switch(typeOfTask){

			case 'PendingTasks':
						let newModel = controller.model.PendingTasks.filter(task =>{
							return task.id != id;
						}
					);

						controller.model.PendingTasks = newModel;

						console.log('NOVO ARRAY: ')
						console.log(newModel);

						break;

			case 'runningTasks':
						//controller.model.runningTasks.splice(indice, 1);

						break;

			case 'CompletedTasks':
						//controller.model.CompletedTasks.splice(indice, 1);

						break;
		}

	}

	static moveTask(columnContainer, taskData, initialModel){
		let IDtask = taskData.children[1].children[2].textContent;
		let columnType = columnContainer.getAttribute('columntype');
		let taskVar = null;

		console.log(IDtask);
		console.log(columnType);


		switch(columnType){

			case 'pending':
						taskVar = initialModel.find(task => task.id == IDtask);
						
						controller.model.PendingTasks.push(taskVar);

					break;

			case 'running':
						taskVar = initialModel.find(task => task.id == IDtask);
						
						controller.model.runningTasks.push(taskVar);

					break;

			case 'completed':
						taskVar = initialModel.find(task => task.id == IDtask);
						
						controller.model.CompletedTasks.push(taskVar);

					break;
		}
	}

}