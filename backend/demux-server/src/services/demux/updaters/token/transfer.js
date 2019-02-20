async function transferHandler (state, payload, blockInfo, context) {
    try {
        // Set eosio.token transfer action schema
        let from     = payload.data.from;
        let to       = payload.data.to;
        let quantity = payload.data.quantity;
        let value    = quantity.split(' ')[0];
        let symbol   = quantity.split(' ')[1];

        if ( symbol === 'TLOS' && ( to === 'eosio.arb' || from === 'eosio.arb' ) ) {
            console.log('Creating a new transfer action record in db');
            await state.transfer.create({ 
                trxHash:  payload.transactionId, // Unique Trx ID
                from:     payload.data.from,
                to:       payload.data.to,
                quantity: payload.data.quantity,
                memo:     payload.data.memo
            });

            if ( to === 'eosio.arb' ) {
                console.log(`Incrementing Balance of from:${from} account_name`);
                await state.balance.updateOne({ owner: from }, {
                    id:       payload.transactionId,
                    owner:    from,
                    $inc:   { escrow: parseFloat(value) }
                }, { upsert: true }).exec();
            }

            if ( from === 'eosio.arb' ) {
                console.log(`Decrementing Balance of to:${to} account_name`);
                let sub_value = parseFloat(val) * -1 // Decrement
                await state.balance.updateOne({ owner: to }, {
                    id:       payload.transactionId,
                    owner:    to,
                    $inc:   { escrow: sub_value }
                }, { upsert: true }).exec();
            }
        }
    } catch (err) {
        console.error('Transfer updater error: ', err);
    }
}

export default transferHandler;