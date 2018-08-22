class BancoHelper{

    constructor(){
        throw new Error('Essa classe não pode ser instanciada');
    }

    static adiciona(nomeBanco, chave, valor){

        let result;
        let request = window.indexedDB.open("Tasks", 1);

        request.onerror = e => {

            console.log('não foi possível estabelecer conexão com o banco');
            console.log(e.target.errorCode);
        }

        request.onsuccess = () =>{
            result = request.result;
            console.log('Conexão obtida com sucesso');
        }

        request.onupgradeneeded = e =>{
            let db = e.target.result;
            let objectStore = db.createObjectStore();

        }
    }
}
