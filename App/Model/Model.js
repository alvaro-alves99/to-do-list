class ModelList{
	
	constructor(){
		this.PendingTasks = [];
		this.runningTasks = [];
		this.CompletedTasks = [];
	}

	static eraseFromModel(self, typeOfTask){
		let id = self.getAttribute('id');

		let newModel = null;

		switch(typeOfTask){

			case 'pending':
						newModel = controller.model.PendingTasks.filter(task => task.id != id);
						controller.model.PendingTasks = newModel;

						break;

			case 'running':
						newModel = controller.model.runningTasks.filter(task => task.id != id);
						controller.model.runningTasks = newModel;

						break;

			case 'completed':
						newModel = controller.model.CompletedTasks.filter(task => task.id != id);
						controller.model.CompletedTasks = newModel;

						break;
		}

	}

	// container pai (coluna), container tarefa, model excluir, model adicionar
	static moveTask(columnContainer, taskData, initialModelString, finalModelString){

		let IDtask = taskData.children[1].children[2].textContent;

		let columnType = columnContainer.getAttribute('columntype');
		let taskVar = null;

		let initialModel = null;

		let initialColumn = null;
		let finalColumn = null;


		switch(initialModelString){

			case 'pending':
						initialModel = controller.model.PendingTasks;
						taskVar = initialModel.find(task => task.id == IDtask);

					break;

			case 'running':
						initialModel = controller.model.runningTasks;
						taskVar = initialModel.find(task => task.id == IDtask);

					break;

			case 'completed':
						initialModel = controller.model.CompletedTasks;
						taskVar = initialModel.find(task => task.id == IDtask);
						
					break;
		}


		switch(finalModelString){

				case 'pending':
						controller.model.PendingTasks.push(taskVar);

						break;

				case 'running':
						controller.model.runningTasks.push(taskVar);

						break;

				case 'completed':
						controller.model.CompletedTasks.push(taskVar);

						break;
		}
	}

}