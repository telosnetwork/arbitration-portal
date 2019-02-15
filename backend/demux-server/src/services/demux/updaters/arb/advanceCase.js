async function advanceCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('AdvanceCase updater PAYLOAD:   ', payload);
        console.log('AdvanceCase updater BlockInfo: ', blockInfo);

        let case_id    = payload.data.case_id;
        
        let arbitrator = payload.data.assigned_arb;

        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        let arbitrators;
        let approvals;
        let case_status;
        if (caseState) {
            ({ arbitrators } = caseState)
            ({ approvals }   = caseState)
            ({ case_status } = caseState)
            if (approvals.length + 1 < arbitrators.length) {
                approvals.push(arbitrator);
            } else if (approvals.length + 1 === arbitrators.length) {
                case_status += 1;
                approvals    = [];
            }
        }

        // Case Status
        await state.case.findOneAndUpdate({ case_id: case_id }, {
            case_status: case_status,
            approvals:   approvals
        }).exec();

    } catch (err) {
        console.error('AdvanceCase updater error: ', err);
    }
}

export default advanceCaseHandler;