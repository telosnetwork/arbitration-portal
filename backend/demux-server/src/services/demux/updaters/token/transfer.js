async function transferHandler (state, payload, blockInfo, context) {
    try {
        // Set eosio.token transfer action schema
        let from     = payload.data.from;
        let to       = payload.data.to;
        let quantity = payload.data.quantity;
        let value    = quantity.split(' ')[0];
        let symbol   = quantity.split(' ')[1];

        if ( symbol === 'TLOS' && ( to === 'eosio.arb' ) ) {
            await state.transfer.create({ 
                trxHash:  payload.transactionId, // Unique Trx ID
                from:     from,
                to:       to,
                quantity: quantity,
                memo:     payload.data.memo
            });
            await state.balance.updateOne({ owner: from }, {
                id:       payload.transactionId,
                owner:    from,
                $inc:   { escrow: parseFloat(value) }
            }, { upsert: true }).exec();
        }
    } catch (err) {
        console.error('Transfer updater error: ', err);
    }
}

export default transferHandler;