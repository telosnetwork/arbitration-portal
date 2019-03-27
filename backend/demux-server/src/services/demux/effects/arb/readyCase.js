function readyCaseEffect(payload, blockInfo, context) {
    try {
        console.log('ReadyCase effect PAYLOAD:   ', payload);
        console.log('ReadyCase effect BlockInfo: ', blockInfo);

        context.socket.emit('readyCaseAction');
    } catch (err) {
        console.error('ReadyCase effect error: ', err);
    }
}

export default readyCaseEffect;