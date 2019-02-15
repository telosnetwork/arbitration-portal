function newJoinderEffect(payload, blockInfo, context) {
    try {
        console.log('NewJoinder effect PAYLOAD:   ', payload);
        console.log('NewJoinder effect BlockInfo: ', blockInfo);

        const post = {
            trxHash: payload.transactionId
        };
        context.socket.emit('newJoinderAction', post);
    } catch (err) {
        console.error('NewJoinder effect error: ', err);
    }
}

export default newJoinderEffect;