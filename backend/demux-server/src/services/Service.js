class Service {
    constructor() {
        let isRunning = false;
    }

    start() { 
        console.log(`startHandler called for Service`);
    }

    stop() { 
        console.log(`stopHandler called for Service`);
    }

    onExit() {
        console.log(`onExitHandler called for Service`);
    }
}

export default Service;