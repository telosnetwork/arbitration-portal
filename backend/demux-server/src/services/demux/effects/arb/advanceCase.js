function advanceCaseEffect(payload, blockInfo, context) {
    try {
        console.log('AdvanceCase effect PAYLOAD:   ', payload);
        console.log('AdvanceCase effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash:      payload.transactionId,
            case_id:      payload.data.case_id,
            assigned_arb: payload.data.assigned_arb
        };
        context.socket.emit('advanceCaseAction', post);
    } catch (err) {
        console.error('AdvanceCase effect error: ', err);
    }
}

export default advanceCaseEffect;