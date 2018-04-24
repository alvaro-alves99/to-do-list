class Helper{

	constructor(){
		throw new Error("essa classe nao pode ser instanciada");
	}

	static	returnDate(){

			let currentDate = new Date();
			return `${currentDate.getDate()}/${currentDate.getMonth() + 1} - ${currentDate.getHours()}:${currentDate.getMinutes()}`;
			console.log(currentDate.getDate());
		}

	static assignDragMovement(nodes){

		nodes.forEach(function(node){

			node.addEventListener("dragstart", function(event){

				event.currentTarget.style.borderBottom = "1px solid rgba(0, 0, 0, .5)";

				this.style.opacity = ".4";
				event.dataTransfer.setData("text/plain", this.innerHTML);

			});

			node.addEventListener("dragend", function(event){

				this.style.opacity = "0";

				setTimeout(n => {
					this.innerHTML = "";
					this.parentNode.removeChild(this);

					ModelList.eraseFromModel(this, 'PendingTasks');
				}, 500);

				

			});
		});

	}


	static onDrop(ev){
		ev.preventDefault();

 		let data = ev.dataTransfer.getData("text");
 		
 		let containerTask = document.createElement('div');
 		containerTask.classList = 'task-cell';
 		containerTask.innerHTML = data;
 		containerTask.setAttribute("draggable", "true");

 		ModelList.moveTask(ev.target, containerTask, controller.model.PendingTasks);

 		ev.target.childNodes[3].appendChild(containerTask);
	}

	static dragOver(ev){
		ev.dataTransfer.setData("text", ev.target.id);
		ev.preventDefault();
		ev.dataTransfer.dropEffect = "move";
	}

}