async function advanceCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('AdvanceCase updater PAYLOAD:   ', payload);
        console.log('AdvanceCase updater BlockInfo: ', blockInfo);

        let case_id = payload.data.case_id;

        //TODO: Don't advance case status until all have approved - check the state comparison of arbitrators and a new field approved_arbitrators (or other alias)

        // Case Status
        await state.case.findOneAndUpdate({ case_id: case_id }, {
            $inc: { case_status: 1 } // Increment (Advance) Case Status +1
        }).exec();

    } catch (err) {
        console.error('AdvanceCase updater error: ', err);
    }
}

export default advanceCaseHandler;