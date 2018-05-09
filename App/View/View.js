class View{
	constructor(){
		this.PendingTasksContainer = $(".pending-tasks");
		this.RunningTasksContainer = $(".running-tasks");
		this.CompletedTasksContainer = $(".completed-tasks");

		this.TaskCellsPending = [];
	}

	updateViewPending(array){
		this.TaskCellsPending = array.map((task, n) =>{
						return `<div class="task-cell" draggable="true" id="${task.id}" type-of-task="pending">
							<div class="task-title">
								<h4>${task.taskName}</h4>
							</div>
							<div class="task-content">
								<span class="category-span"><strong>Category:<br></strong> ${task.category}</span>
								<span class="time-span"><strong>Added at:<br></strong> ${task.date}</span>
								<span class="id-task">${task.id}</span>
							</div>
						</div>`
		});

		this.PendingTasksContainer.innerHTML = this.TaskCellsPending.join('');

		
	}
}