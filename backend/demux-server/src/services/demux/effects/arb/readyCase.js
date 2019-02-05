function readyCaseEffect(payload, blockInfo, context) {
    try {
        console.log('ReadyCase effect PAYLOAD:   ', payload);
        console.log('ReadyCase effect BlockInfo: ', blockInfo);

        const post = {
            trxHash:  payload.transactionId,
            case_id:  payload.data.case_id,
            claimant: payload.data.claimant
        };
        context.socket.emit('readyCaseAction', post);
    } catch (err) {
        console.error('ReadyCase effect error: ', err);
    }
}

export default readyCaseEffect;