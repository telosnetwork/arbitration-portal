function recuseEffect(payload, blockInfo, context) {
    try {
        console.log('Recuse effect PAYLOAD:   ', payload);
        console.log('Recuse effect BlockInfo: ', blockInfo);

        const post = {
            trxHash: payload.transactionId
        };
        context.socket.emit('recuseAction', post);
    } catch (err) {
        console.error('Recuse effect error: ', err);
    }
}

export default recuseEffect;