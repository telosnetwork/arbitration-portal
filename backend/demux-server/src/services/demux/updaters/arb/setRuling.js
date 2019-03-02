async function setRulingHandler (state, payload, blockInfo, context) {
    try {
        console.log('SetRuling updater PAYLOAD:   ', payload);
        console.log('SetRuling updater BlockInfo: ', blockInfo);

        let case_id = parseInt(payload.data.case_id);
        let case_ruling = payload.data.case_ruling;

        let caseState =  await state.case.findOne({ case_id: case_id }).exec();
        if (caseState) {
            await state.case.findOneAndUpdate({ case_id: case_id }, {
                case_ruling: case_ruling
            }).exec();
        }
    } catch (err) {
        console.error('SetRuling updater error: ', err);
    }
}

export default setRulingHandler;