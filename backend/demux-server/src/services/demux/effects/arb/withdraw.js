function withdrawEffect(payload, blockInfo, context) {
    try {
        console.log('Withdraw effect PAYLOAD: ', payload);
        console.log('Withdraw effect BlockInfo: ', blockInfo);

        const post = {
            trxHash:   payload.transactionId,
            blockHash: blockInfo.blockHash,
            timestamp: blockInfo.timestamp,
            owner:     payload.data.owner
        };
        context.socket.emit('WithdrawAction', post);
    } catch (err) {
        console.error('Withdraw effect error: ', err);
    }
}

export default withdrawEffect;