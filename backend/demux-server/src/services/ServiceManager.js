

class ServiceManager {
    constructor(onExitHandlers) {
        this.services = [];
        let handlers = [
            ...onExitHandlers,
            {
                event: 'exit,SIGINT,SIGUSR1,SIGUSR2,uncaughtexception',
                onEvent: this.onExit
            }
        ];
        this.bindExitHandlers(handlers);
    }

    addService(serviceName, serviceObj) {
        this.services.push(
            {
                name: serviceName,
                obj: serviceObj
            }
        )
    }

    getServiceByName(serviceName) {
        for(let i = 0; i < this.services.length; i++) {
            if (this.services[i].name === serviceName)
                return this.services[i];
        }
        return null;
    }

    startService(serviceName) {
        let service = this.getServiceByName(serviceName);
        if(service)
            service.obj.start();
    }

    stopService(serviceName) {
        let service = this.getServiceByName(serviceName);
        if (service)
            service.obj.stop();
    }

    startAll() {
        this.services.forEach( (service) => {
            console.log(service);
            service.obj.start();
        });
    }

    bindExitHandlers(handlers) {
        handlers.forEach( (handler) => {
            let events = handler.event.split(',');
            events.forEach((e) => {
                console.log(`binding event ${e}`);
                process.on(`${e}`, handler.onEvent.bind(this));
            });
        });
    }

    onExit() {
        for (let i = 0; i < this.services.length; i++)
            this.services[i].obj.onExit();

        process.exit();
    }
}

export default ServiceManager;