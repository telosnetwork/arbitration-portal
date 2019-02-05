async function readyCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('ReadyCase updater PAYLOAD:   ', payload);
        console.log('ReadyCase updater BlockInfo: ', blockInfo);

        let case_id = payload.data.case_id;

        // Case_Status
        let case_status = 1; // AWAITING_ARBS (1)

        await state.case.findOneAndUpdate({ case_id: case_id }, {
            case_status: case_status
        }).exec();
    } catch (err) {
        console.error('ReadyCase updater error: ', err);
    }
}

export default readyCaseHandler;