function recuseEffect(payload, blockInfo, context) {
    try {
        console.log('Recuse effect PAYLOAD:   ', payload);
        console.log('Recuse effect BlockInfo: ', blockInfo);

        const post = {
            trxHash:      payload.transactionId,
            case_id:      payload.data.case_id,
            rationale:    payload.data.rationale,
            assigned_arb: payload.data.assigned_arb
        };
        context.socket.emit('recuseAction', post);
    } catch (err) {
        console.error('Recuse effect error: ', err);
    }
}

export default recuseEffect;