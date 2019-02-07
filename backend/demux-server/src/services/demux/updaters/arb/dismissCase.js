async function dismissCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('DismissCase updater PAYLOAD:   ', payload);
        console.log('DismissCase updater BlockInfo: ', blockInfo);

        let case_id     = payload.data.case_id;

        let ruling_link = payload.data.ruling_link;

        // Case Status
        let case_status = 8; // DISMISSED (8)

        await state.case.findOneAndUpdate({ case_id: case_id }, {
            case_status: case_status,
            case_ruling: ruling_link
        }).exec();
    } catch (err) {
        console.error('DismissCase updater error: ', err);
    }
}

export default dismissCaseHandler;