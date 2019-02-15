function resolveCaseEffect(payload, blockInfo, context) {
    try {
        console.log('ResolveCase effect PAYLOAD:   ', payload);
        console.log('ResolveCase effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash: payload.transactionId
        };
        context.socket.emit('resolveCaseAction', post);
    } catch (err) {
        console.error('ResolveCase effect error: ', err);
    }
}

export default resolveCaseEffect;