//NOTE: Balance tracking on eosio.arb is not implemented.

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
                console.log(`Decrementing Balance of from:${from} account_name`);
                await state.balance.updateOne({ owner: from }, {
                    id:       blockInfo.blockNumber,
                    owner:    from,
                    $inc:   { escrow: value }
                }, { upsert: true }).exec();
            }

            if ( from === 'eosio.arb' ) {
                console.log(`Upserting Balance of to:${to} account_name`);
                value *= -1 // Decrement
                await state.balance.updateOne({ owner: to }, {
                    id:       blockInfo.blockNumber,
                    owner:    to,
                    $inc:   { escrow: value }
                }, { upsert: true }).exec();
            }
        }
    } catch (err) {
        console.error('Transfer updater error: ', err);
    }
}

export default transferHandler;