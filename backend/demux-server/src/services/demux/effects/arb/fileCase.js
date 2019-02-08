function fileCaseEffect(payload, blockInfo, context) {
    try {
        console.log('FileCase effect PAYLOAD:   ', payload);
        console.log('FileCase effect BlockInfo: ', blockInfo);
        
        const post = {
            trxHash:    payload.transactionId,
            blockHash:  blockInfo.blockHash,
            timestamp:  blockInfo.timestamp,
            claimant:   payload.data.claimant,
            claim_link: payload.data.claim_link,
            lang_codes: payload.data.lang_codes,
            respondant: payload.data.respondant
        };
        context.socket.emit('fileCaseAction', post);
    } catch (err) {
        console.error('FileCase effect error: ', err);
    }
}

export default fileCaseEffect;