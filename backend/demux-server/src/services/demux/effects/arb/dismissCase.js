function dismissCaseEffect(payload, blockInfo, context) {
    try {
        console.log('DismissCase effect PAYLOAD:   ', payload);
        console.log('DismissCase effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash: payload.transactionId
        };
        context.socket.emit('dismissCaseAction', post);
    } catch (err) {
        console.error('DismissCase effect error: ', err);
    }
}

export default dismissCaseEffect;