function acceptClaimEffect(payload, blockInfo, context) {
    try {
        console.log('AcceptClaim effect PAYLOAD:   ', payload);
        console.log('AcceptClaim effect BlockInfo: ', blockInfo);   
    } catch (err) {
        console.error('AcceptClaim effect error: ', err);
    }
}

export default acceptClaimEffect;