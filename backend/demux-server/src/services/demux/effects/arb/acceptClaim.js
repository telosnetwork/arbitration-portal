function acceptClaimEffect(payload, blockInfo, context) {
    try {
        console.log('AcceptClaim effect PAYLOAD:   ', payload);
        console.log('AcceptClaim effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash:        payload.transactionId,
            blockHash:      blockInfo.blockHash,
            timestamp:      blockInfo.timestamp,
            case_id:        payload.data.case_id,
            assigned_arb:   payload.data.assigned_arb,
            claim_hash:     payload.data.claim_hash,
            decision_link:  payload.data.decision_link,
            decision_class: payload.data.decision_class
        };
        context.socket.emit('acceptClaimAction', post);
    } catch (err) {
        console.error('AcceptClaim effect error: ', err);
    }
}

export default acceptClaimEffect;