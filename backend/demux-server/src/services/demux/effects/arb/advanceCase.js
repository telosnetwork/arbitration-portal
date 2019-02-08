function advanceCaseEffect(payload, blockInfo, context) {
    try {
        console.log('AdvanceCase effect PAYLOAD:   ', payload);
        console.log('AdvanceCase effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash: payload.transactionId
        };
        context.socket.emit('advanceCaseAction', post);
    } catch (err) {
        console.error('AdvanceCase effect error: ', err);
    }
}

export default advanceCaseEffect;