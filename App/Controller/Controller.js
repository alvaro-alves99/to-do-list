class Controller{

	constructor(){

		let self = this;
		this.model = ProxyFactory.create(new ModelList(), self);
		this.view = new View();

		this.submitButton = $(".botao-adiciona");

		this.assignButtonEvent(this.submitButton);
		this.idTask = 1;
		this.taskDAO = null;
		this.init();

	}

	init(){
		ConnectionFactory.getConnection()
			.then(result => {
				this.taskDAO = new TaskDAO(result);
				console.log(result);
			})
			.catch(erro => console.log(erro))
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

		if(!task.taskName){
			return alert("Task name can't be blank");
		}

		this.taskDAO.adiciona(task)
			.then(dados => console.log(dados))
			.catch(erro => console.log(erro));

		this.idTask++;


		this.model.adicionarTarefa(task)

		this.view.updateViewPending(this.model.PendingTasks);

		let taskCells = Array.from(document.querySelectorAll(".task-cell"));

		Helper.assignDragMovement(taskCells, this.model);

		$("#nome-tarefa").value = "";

		// BancoHelper.adiciona();
	}

	onDrop(evento){
		Helper.onDrop(evento, this.model);
	}




}
