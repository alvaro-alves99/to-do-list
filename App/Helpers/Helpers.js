class Helper{

	constructor(){
		throw new Error("essa classe nao pode ser instanciada");
	}

	static	returnDate(){

			let currentDate = new Date();
			return `${currentDate.getDate()}/${currentDate.getMonth() + 1} - ${currentDate.getHours()}:${currentDate.getMinutes()}`;
		}


	static assignDragMovementOne(container){

		container.addEventListener("dragstart", function(ev){

				ev.currentTarget.style.borderBottom = "1px solid rgba(0, 0, 0, .5)";

				this.style.opacity = ".4";
				ev.dataTransfer.setData("text/plain", this.innerHTML + `<span style="display:none;" class="type-of-task">${this.getAttribute('type-of-task')}</span>`);

			});

		container.addEventListener("dragend", function(event){

				this.style.opacity = "0";
				this.classList.add('transformY');

				let typeOfTask = this.getAttribute('type-of-task');

				setTimeout( (n) => {
					this.innerHTML = "";
					this.parentNode.removeChild(this);

					ModelList.eraseFromModel(this, typeOfTask);
				}, 300);

				

			});
	}

	static assignDragMovement(nodes){

		nodes.forEach(function(node){

			Helper.assignDragMovementOne(node);

			});
		};


	static onDrop(ev){
		ev.preventDefault();

 		let data = ev.dataTransfer.getData("text");
 		
 		let containerTask = document.createElement('div');
 		containerTask.classList = 'task-cell';
 		containerTask.innerHTML = data;
 		containerTask.setAttribute("draggable", "true");

 		let idTaskNode = containerTask.children[1].children[2].textContent;
 		containerTask.setAttribute("id", idTaskNode);

 		let initialColumn = containerTask.children[2].textContent;

 		Helper.assignDragMovementOne(containerTask);

 		let selfTarget = ev.target;


 		while(selfTarget.getAttribute('class') != 'coluna-item'){

 			selfTarget = selfTarget.parentNode;
 		}

 		if(selfTarget.getAttribute('class') === 'coluna-item'){

 			let finalColumn = selfTarget.getAttribute('columntype');

 			containerTask.setAttribute('type-of-task', finalColumn);
 			

 			// container pai (coluna), container tarefa, model excluir, model adicionar
 			ModelList.moveTask(selfTarget, containerTask, initialColumn, finalColumn);

 			containerTask.children[2].textContent = finalColumn;

 			selfTarget.childNodes[3].appendChild(containerTask);

 			console.log(controller.model);
 		}

 		
	}

	static dragOver(ev){
		ev.dataTransfer.setData("text", ev.target.id);
		ev.preventDefault();
		ev.dataTransfer.dropEffect = "move";
	}

}