function joinCasesEffect(payload, blockInfo, context) {
    try {
        console.log('JoinCases effect PAYLOAD:   ', payload);
        console.log('JoinCases effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash:     payload.transactionId,
            blockHash:   blockInfo.blockHash,
            timestamp:   blockInfo.timestamp,
            joinder_id:  payload.data.joinder_id,
            new_case_id: payload.data.new_case_id,
            arb:         payload.data.arb
        };
        context.socket.emti('joinCasesAction', post);
    } catch (err) {
        console.error('JoinCases effect error: ', err);
    }
}

export default joinCasesEffect;