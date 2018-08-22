var stores = ['tasks'];
var version = 1;
var dbName = 'to-do-list';
var connection = null;

class ConnectionFactory{

    constructor(){
        throw new Error('Essa classe não pode ser instanciada');
    }

    static getConnection(){
        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e =>{
                console.log('primeira vez');
                stores.forEach(item =>{
                    if(e.target.result.objectStoreNames.contains(item)){
                        e.target.result.deleteObjectStore(item);
                    }

                    e.target.result.createObjectStore(item, {autoIncrement: true});
                })
            };

            openRequest.onsuccess = e =>{
                console.log('on success');
                if(!connection){
                    connection = e.target.result;
                }
                resolve(connection);
            };

            openRequest.onerror = e =>{
                console.log(e.target.error);
                reject(e.target.error.name);
            };

        });
    }

    static addData(){

    }
}
