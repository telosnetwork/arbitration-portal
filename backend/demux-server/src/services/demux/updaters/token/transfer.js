import colors from "colors";

//NOTE: balance tracking on eosio.arb is no yet implemented.

function transfer (state, payload, blockInfo, context) {
    try {
        // console.log("state: ", state);
        // console.log("payload: ", payload);
        // console.log("blockInfo: ", blockInfo);
        // console.log("context: ", context);

        let to = payload.data.to;
        let from = payload.data.from;
        let quantity = payload.data.quantity;
        let symbol = quantity.split(' ')[1];

        if (to ===  'eosio.arb' && symbol === 'TLOS') {
            console.log(`adding transfer action to data base`);
            state.models.transfer.create({
                from: payload.data.from,
                to: payload.data.to,
                trxHash: payload.transactionId,
                quantity: payload.data.quantity,
                memo: payload.data.memo
            });

            //TODO: Find Balance under from account_name
                    //if account_name has balance
                    //then apply delta
        }

        if(from === 'eosio.arb' && symbol === 'TLOS') {
            console.log(`adding transfer action to data base`);
            //TODO: add transfer to db
            //TODO: find Balance under to account_name
                    //if account_name has balance
                    //then apply delta
        }
    } catch (err) {
        console.error("transfer updater error: ", err);
    }
}

export default transfer