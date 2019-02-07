function addArbsEffect(payload, blockInfo, context) {
    try {
        console.log('AddArbs effect PAYLOAD:   ', payload);
        console.log('AddArbs effect BlockInfo: ', blockInfo); 
        
        const post = {
            trxHash:            payload.transactionId,
            case_id:            payload.data.case_id,
            assigned_arb:       payload.data.assigned_arb,
            num_arbs_to_assign: payload.data.num_arbs_to_assign
        };
        context.socket.emit('addArbsAction', post);
    } catch (err) {
        console.error('AddArbs effect error: ', err);
    }
}

export default addArbsEffect;