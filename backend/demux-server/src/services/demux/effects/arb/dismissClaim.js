function dismissClaimEffect(payload, blockInfo, context) {
    try {
        console.log('DismissClaim effect PAYLOAD:   ', payload);
        console.log('DismissClaim effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash: payload.transactionId
        };
        context.socket.emit('dismissClaimAction', post);
    } catch (err) {
        console.error('DismissClaim effect error: ', err);
    }
}

export default dismissClaimEffect;