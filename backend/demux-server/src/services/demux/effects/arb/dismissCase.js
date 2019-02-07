function dismissCaseEffect(payload, blockInfo, context) {
    try {
        console.log('DismissCase effect PAYLOAD:   ', payload);
        console.log('DismissCase effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash:      payload.transactionId,
            blockHash:    blockInfo.blockHash,
            timestamp:    blockInfo.timestamp,
            case_id:      payload.data.case_id,
            assigned_arb: payload.data.assigned_arb,
            ruling_link:  payload.data.ruling_link
        };
        context.socket.emit('dismissCaseAction', post);
    } catch (err) {
        console.error('DismissCase effect error: ', err);
    }
}

export default dismissCaseEffect;