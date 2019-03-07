function setRulingEffect(payload, blockInfo, context) {
    try {
        console.log('SetRuling effect PAYLOAD:   ', payload);
        console.log('SetRuling effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash: payload.transactionId
        };
        context.socket.emit('setRulingAction', post);
    } catch (err) {
        console.error('SetRuling effect error: ', err);
    }
}

export default setRulingEffect;