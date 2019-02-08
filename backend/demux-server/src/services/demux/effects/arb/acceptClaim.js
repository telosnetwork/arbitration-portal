function acceptClaimEffect(payload, blockInfo, context) {
    try {
        console.log('AcceptClaim effect PAYLOAD:   ', payload);
        console.log('AcceptClaim effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash: payload.transactionId
        };
        context.socket.emit('acceptClaimAction', post);
    } catch (err) {
        console.error('AcceptClaim effect error: ', err);
    }
}

export default acceptClaimEffect;