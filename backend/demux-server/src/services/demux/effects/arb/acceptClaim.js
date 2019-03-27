function acceptClaimEffect(payload, blockInfo, context) {
    try {
        console.log('AcceptClaim effect PAYLOAD:   ', payload);
        console.log('AcceptClaim effect BlockInfo: ', blockInfo);   

        context.socket.emit('acceptClaimAction');
    } catch (err) {
        console.error('AcceptClaim effect error: ', err);
    }
}

export default acceptClaimEffect;