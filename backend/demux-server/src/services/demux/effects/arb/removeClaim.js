function removeClaimEffect(payload, blockInfo, context) {
    try {
        console.log('RemoveClaim effect PAYLOAD:   ', payload);
        console.log('RemoveClaim effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash:    payload.transactionId,
            blockHash:  blockInfo.blockHash,
            timestamp:  blockInfo.timestamp,
            case_id:    payload.data.case_id,
            claim_hash: payload.data.claim_hash,
            claimant:   payload.data.claimant
        };
        context.socket.emit('removeClaimAction', post);
    } catch (err) {
        console.error('RemoveClaim effect error: ', err);
    }
}

export default removeClaimEffect;