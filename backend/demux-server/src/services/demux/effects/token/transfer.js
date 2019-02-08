function transferEffect(payload, blockInfo, context) {
    try {
        console.log('Transfer effect PAYLOAD:   ', payload);
        console.log('Transfer effect BlockInfo: ', blockInfo);   

        let post;
        if (payload.data.to == 'eosio.arb') {
            post = {
                trxHash:   payload.transactionId,
                blockHash: blockInfo.blockHash,
                owner:     payload.data.from,
            };
        } else if (payload.data.from == 'eosio.arb') {
            post = {
                trxHash:   payload.transactionId,
                blockHash: blockInfo.blockHash,
                owner:     payload.data.to,
            };
        }
        context.socket.emit('transferAction', post);
    } catch (err) {
        console.error('Transfer effect error: ', err);
    }
}

export default transferEffect;