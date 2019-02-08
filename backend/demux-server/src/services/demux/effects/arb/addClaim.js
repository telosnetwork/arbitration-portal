function addClaimEffect(payload, blockInfo, context) {
    try {
        console.log('AddClaim effect PAYLOAD:   ', payload);
        console.log('AddClaim effect BlockInfo: ', blockInfo);
        
        const post = {
            trxHash: payload.transactionId
        };
        context.socket.emit('addClaimAction', post);
    } catch (err) {
        console.error('AddClaim effect error: ', err);
    }
}

export default addClaimEffect;