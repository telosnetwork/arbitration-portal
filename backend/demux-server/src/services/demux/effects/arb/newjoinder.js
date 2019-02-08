function newJoinderEffect(payload, blockInfo, context) {
    try {
        console.log('NewJoinder effect PAYLOAD:   ', payload);
        console.log('NewJoinder effect BlockInfo: ', blockInfo);

        const post = {
            trxHash:         payload.transactionId,
            blockHash:       blockInfo.blockHash,
            timestamp:       blockInfo.timestamp,
            base_case_id:    payload.data.base_case_id,
            joining_case_id: payload.data.joining_case_id,
            arb:             payload.data.arb
        };
        context.socket.emit('newJoinderAction', post);
    } catch (err) {
        console.error('NewJoinder effect error: ', err);
    }
}

export default newJoinderEffect;