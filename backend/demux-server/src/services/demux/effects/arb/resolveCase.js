function resolveCaseEffect(payload, blockInfo, context) {
    try {
        console.log('ResolveCase effect PAYLOAD:   ', payload);
        console.log('ResolveCase effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash:      payload.transactionId,
            blockHash:    blockInfo.blockHash,
            timestamp:    blockInfo.timestamp,
            case_id:      payload.data.case_id,
            assigned_arb: payload.data.assigned_arb,
            case_ruling:  payload.data.case_ruling
        };
        context.socket.emit('resolveCaseAction', post);
    } catch (err) {
        console.error('ResolveCase effect error: ', err);
    }
}

export default resolveCaseEffect;