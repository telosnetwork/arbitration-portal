function deleteCaseEffect(payload, blockInfo, context) {
    try {
        console.log('DeleteCase effect PAYLOAD:   ', payload);
        console.log('DeleteCase effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash: payload.transactionId
        };
        context.socket.emit('deleteCaseAction', post);
    } catch (err) {
        console.error('DeleteCase effect error: ', err);
    }
}

export default deleteCaseEffect;