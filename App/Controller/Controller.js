class Controller{

	constructor(){
		
		this.model = new ModelList();
		this.view = new View();

		this.submitButton = $(".botao-adiciona");

		this.assignButtonEvent(this.submitButton);
		this.idTask = 1;

	}

	assignButtonEvent(submitButton){
		submitButton.addEventListener("click", (event) =>{
			event.preventDefault();

			this.addTask();

		});
	}

	addTask(){
		let task = {
			"id":this.idTask,
			"taskName" : $("#nome-tarefa").value,
			"category" : $("#categoria-tarefa").value,
			"date": Helper.returnDate(),
		}

		this.idTask++;

		if(!task.taskName){
			return alert("Task name can't be blank");
		}

		this.model.PendingTasks.push(task);

		this.view.updateViewPending(this.model.PendingTasks);

		let taskCells = Array.from(document.querySelectorAll(".task-cell"));

		Helper.assignDragMovement(taskCells);
	}

	
}