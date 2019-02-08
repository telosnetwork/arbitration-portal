function newArbStatusEffect(payload, blockInfo, context) {
    try {
        console.log('NewArbStatus effect PAYLOAD:   ', payload);
        console.log('NewArbStatus effect BlockInfo: ', blockInfo);
        
        const post = {
            trxHash:    payload.transactionId,
            arbitrator: payload.data.arbitrator
        };
        context.socket.emit('newArbStatusAction', post);
    } catch (err) {
        console.error('NewArbStatus effect error: ', err);
    }
}

export default newArbStatusEffect;