class TaskDAO{

    constructor(connection){
        this.connection = connection;
        this._store = 'tasks';
    }

    adiciona(task){
        return new Promise((resolve, reject) => {

            let request = this.connection
                                .transaction([this._store], 'readwrite')
                                .objectStore(this._store)
                                .add(task);
        })

        request.onsuccess = e => resolve();
        request.onerror = e => {
            console.log(e.target.error);
            reject(e.target.error);
        }
    }

    lista(){
        return new Promise((resolve, reject) => {

            let cursor = this.connection
                            .transaction([this._store], "readwrite")
                            .objectStore(this._store)
                            .openCursor()

            let tasks = [];

            cursor.onsuccess = e =>{
                let atual = e.target.result;

                if(atual){

                    let item = atual.value;

                    tasks.push(item);

                    atual.continue();
                } else{
                    resolve(tasks);
                }
            }

            cursor.onerror = e => {
                reject(e.target.error);
            }
        });
    }

    limpaLista(){
        return new Promise((resolve, reject) => {

            let cursor = this.connection
                            .transaction([this._store], "readwrite")
                            .objectStore(this._store)
                            .openCursor()

            cursor.onsuccess = e =>{
                let atual = e.target.result;

                if(atual){
                    atual.delete();

                    atual.continue();

                } else{
                    resolve('Todas as tarefas foram deletadas');
                }
            }

            cursor.onerror = e => {
                reject(e.target.error);
            }
        });
    }

    atualizaBanco(novosDados){

        console.log(novosDados);
        console.log('atualizando o banco');

        this.limpaLista()
            .then(dados =>{
                console.log(dados);
                this.adiciona(novosDados);
            })
            .catch(erro => console.log(erro));
    }
}
