function newCfStatusEffect(payload, blockInfo, context) {
    try {
        console.log('NewCfStatus effect PAYLOAD:   ', payload);
        console.log('NewCfStatus effect BlockInfo: ', blockInfo);

        const post = {
            trxHash:      payload.transactionId,
            case_id:      payload.data.case_id,
            new_status:   payload.data.new_status,
            assigned_arb: payload.data.assigned_arb
        };
        context.socket.emit('newCfStatusAction', post);
    } catch (err) {
        console.error('NewCfStatus effect error: ', err);
    }
}

export default newCfStatusEffect;