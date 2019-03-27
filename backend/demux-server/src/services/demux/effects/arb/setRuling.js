function setRulingEffect(payload, blockInfo, context) {
    try {
        console.log('SetRuling effect PAYLOAD:   ', payload);
        console.log('SetRuling effect BlockInfo: ', blockInfo);   

        context.socket.emit('setRulingAction');
    } catch (err) {
        console.error('SetRuling effect error: ', err);
    }
}

export default setRulingEffect;