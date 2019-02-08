function removeClaimEffect(payload, blockInfo, context) {
    try {
        console.log('RemoveClaim effect PAYLOAD:   ', payload);
        console.log('RemoveClaim effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash: payload.transactionId
        };
        context.socket.emit('removeClaimAction', post);
    } catch (err) {
        console.error('RemoveClaim effect error: ', err);
    }
}

export default removeClaimEffect;