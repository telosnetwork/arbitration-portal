

class ServiceManager {
    constructor(onExitHandlers) {
        this.services = [];
        let handlers = [
            ...onExitHandlers,
            {
                event: 'SIGINT,SIGUSR1,SIGUSR2,uncaughtexception',
                onEvent: this.exit
            },
            {
                event: 'exit',
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
        else
            throw Error(`service: ${serviceName} not found`);
    }

    stopService(serviceName) {
        let service = this.getServiceByName(serviceName);
        if (service)
            service.obj.stop();
        else
            throw Error(`service: ${serviceName} not found`);
    }

    startAll() {
        this.services.forEach( (service) => {
            service.obj.start();
        });
    }

    bindExitHandlers(handlers) {
        handlers.forEach( (handler) => {
            let events = handler.event.split(',');
            events.forEach((e) => {
                // console.log(`binding event ${e}`);
                process.on(`${e}`, handler.onEvent.bind(this));
            });
        });
    }

    exit() {
        console.log(`exiting`);
        process.exit();
    }

    onExit() {
        console.log('onExit called');
        for (let i = 0; i < this.services.length; i++)
            this.services[i].obj.onExit();

        process.exit();
    }
}

export default ServiceManager;