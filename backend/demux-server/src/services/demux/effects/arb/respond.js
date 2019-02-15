function respondEffect(payload, blockInfo, context) {
    try {
        console.log('Respond effect PAYLOAD:   ', payload);
        console.log('Respond effect BlockInfo: ', blockInfo);

        const post = {
            trxHash: payload.transactionId
        };
        context.socket.emit('respondAction', post);
    } catch (err) {
        console.error('Respond effect error: ', err);
    }
}

export default respondEffect;