import colors from "colors";

async function transfer (state, payload, blockInfo, context) {
    try {
        //TODO: make sure to or from is eosio.arb
        state.models.transfer.create({
           from: payload.data.from,
           to: payload.data.to,
           trxHash: payload.transactionId,
           quantity: payload.data.quantity,
           memo: payload.data.memo
        });
        console.log('trx logged'.red);
        // console.log("transfer updater state: ".red, state);
        // console.log("transfer updater payload: ".red, payload);
    } catch (err) {
        console.error(err)
    }
}

export default transfer