import colors from "colors";

async function transfer (state, payload, blockInfo, context) {
    try {
        console.log("state: ", state);
        console.log("payload: ", payload);
        console.log("blockInfo: ", blockInfo);
        console.log("context: ", context);
        // state.models.transfer.create({
        //    from: payload.data.from,
        //    to: payload.data.to,
        //    trxHash: payload.transactionId,
        //    quantity: payload.data.quantity,
        //    memo: payload.data.memo
        // });
    } catch (err) {
        console.error("transfer updater error: ", err);
    }
}

export default transfer