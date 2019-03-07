function withdrawEffect(payload, blockInfo, context) {
    try {
        console.log('Withdraw effect PAYLOAD: ', payload);
        console.log('Withdraw effect BlockInfo: ', blockInfo);

        const post = {
            trxHash: payload.transactionId,
            owner:   payload.data.owner
        };
        context.socket.emit('withdrawAction', post);
    } catch (err) {
        console.error('Withdraw effect error: ', err);
    }
}

export default withdrawEffect;