function transferEffect(payload, blockInfo, context) {
    try {
        console.log('Transfer effect PAYLOAD:   ', payload);
        console.log('Transfer effect BlockInfo: ', blockInfo);   

        let post;

        let to       = payload.data.to;
        let quantity = payload.data.quantity;
        let symbol   = quantity.split(' ')[1];

        if (symbol === 'TLOS' && ( to === 'eosio.arb' )) {
            post = {
                trxHash:   payload.transactionId,
                blockHash: blockInfo.blockHash,
                owner:     payload.data.from
            };
        }
        context.socket.emit('transferAction', post);
    } catch (err) {
        console.error('Transfer effect error: ', err);
    }
}

export default transferEffect;