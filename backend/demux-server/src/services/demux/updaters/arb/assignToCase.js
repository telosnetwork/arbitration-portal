async function assignToCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('AssignToCase updater PAYLOAD:   ', payload);
        console.log('AssignToCase updater BlockInfo: ', blockInfo);

        let case_id    = payload.data.case_id;

        let arbitrator = payload.data.arb_to_assign;

        // Arbitrator Status
        let arb_status = 0 // AVAILABLE (0)

        let arbState = await state.arbitrator.findOne({ name: arbitrator }).exec();
        let open_case_ids;
        if (arbState) {
            ({ open_case_ids } = arbState)
            open_case_ids.push(case_id);
        } else {
            open_case_ids = [case_id];
        }
        await state.arbitrator.findOneAndUpdate({ name: arbitrator }, {
            name:          arbitrator,
            arb_status:    arb_status,
            open_case_ids: open_case_ids
        }, { upsert: true }).exec();

        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        if (caseState) {
            await state.case.findOneAndUpdate({ case_id: case_id }, {
                arbitrators: [arbitrator]
            }).exec();
        }
    } catch (err) {
        console.error('AssignToCase updater error: ', err);
    }
}

export default assignToCaseHandler;