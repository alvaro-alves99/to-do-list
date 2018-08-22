class ProxyFactory{

    constructor(){
        throw new Error('essa classe não pode ser instanciada');
    }

    static create(item, self){
        return new Proxy(item, {
            get(target, prop, receiver){

                if(typeof target[`${prop}`] == 'function'){


                    return function(){
                        Reflect.apply(target[prop], target, arguments);

                        self.taskDAO.atualizaBanco(target);

                    }
                }

                return Reflect.get(target, prop, receiver);
            }
        });
    }
}
