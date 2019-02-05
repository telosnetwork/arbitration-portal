async function newCfStatusHandler (state, payload, blockInfo, context) {
    try {
        console.log('NewCfStatus updater PAYLOAD:   ', payload);
        console.log('NewCfStatus updater BlockInfo: ', blockInfo);

        let case_id     = payload.data.case_id;

        // Case Status
        let case_status = payload.data.new_status;

        await state.case.findOneAndUpdate({ case_id: case_id }, {
            case_status: case_status
        }).exec();

    } catch (err) {
        console.error('NewCfStatus updater error: ', err);
    }
}

export default newCfStatusHandler;