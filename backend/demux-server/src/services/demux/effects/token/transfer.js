function transferEffect(payload, blockInfo, context) {
    try {
        console.log('Transfer effect PAYLOAD:   ', payload);
        console.log('Transfer effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash:  payload.transactionId,
            from:     payload.data.from,
            to:       payload.data.to,
            quantity: payload.data.quantity,
            memo:     payload.data.memo
        };
        context.socket.emit('transferAction', post);
    } catch (err) {
        console.error('Transfer effect error: ', err);
    }
}

export default transferEffect;