function transferEffect(payload, blockInfo, context) {
    try {
        console.log('Transfer effect PAYLOAD:   ', payload);
        console.log('Transfer effect BlockInfo: ', blockInfo);   

        let to       = payload.data.to;
        let quantity = payload.data.quantity;
        let symbol   = quantity.split(' ')[1];

        if (symbol === 'TLOS' && ( to === 'eosio.arb' )) {
            context.socket.emit('transferaction');
        }
    } catch (err) {
        console.error('Transfer effect error: ', err);
    }
}

export default transferEffect;