function dismissClaimEffect(payload, blockInfo, context) {
    try {
        console.log('DismissClaim effect PAYLOAD:   ', payload);
        console.log('DismissClaim effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash:      payload.transactionId,
            blockHash:    blockInfo.blockHash,
            timestamp:    blockInfo.timestamp,
            case_id:      payload.data.case_id,
            assigned_arb: payload.data.assigned_arb,
            claim_hash:   payload.data.claim_hash,
            memo:         payload.data.memo
        };
        context.socket.emit('dismissClaimAction', post);
    } catch (err) {
        console.error('DismissClaim effect error: ', err);
    }
}

export default dismissClaimEffect;