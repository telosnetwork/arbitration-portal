function readyCaseEffect(payload, blockInfo, context) {
    try {
        console.log('ReadyCase effect PAYLOAD:   ', payload);
        console.log('ReadyCase effect BlockInfo: ', blockInfo);

        const post = {
            trxHash: payload.transactionId
        };
        context.socket.emit('readyCaseAction', post);
    } catch (err) {
        console.error('ReadyCase effect error: ', err);
    }
}

export default readyCaseEffect;