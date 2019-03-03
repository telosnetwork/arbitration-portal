async function readyCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('ReadyCase updater PAYLOAD:   ', payload);
        console.log('ReadyCase updater BlockInfo: ', blockInfo);

        let case_id  = parseInt(payload.data.case_id);
        let claimant = payload.data.claimant;

        // Case_Status
        let case_status = 1; // AWAITING_ARBS (1)

        let sub_value = parseFloat(100) * -1; // _config.fee_structure[0]
        await state.balance.updateOne({ owner: claimant }, {
            id:    payload.transactionId,
            owner: claimant,
            $inc:  { escrow: sub_value }
        }, { upsert: true }).exec();

        await state.case.findOneAndUpdate({ case_id: case_id }, {
            case_status: case_status
        }).exec();
    } catch (err) {
        console.error('ReadyCase updater error: ', err);
    }
}

export default readyCaseHandler;