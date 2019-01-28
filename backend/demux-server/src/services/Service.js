class Service {
    constructor() {
        let isRunning = false;
    }

    start() { }

    stop() { }

    onExit() {
        console.log(`onExitHandler called for service`);
    }
}

export default Service;