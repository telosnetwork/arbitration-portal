async function deleteCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('DeleteCase updater PAYLOAD:   ', payload);
        console.log('DeleteCase updater BlockInfo: ', blockInfo);

        let case_id = payload.data.case_id;

        // Delete|Remove CaseFile
        await state.case.findOneAndDelete({ case_id: case_id }).exec();

        // Add Removed Case_ID to Counter
        await state.counter.create({
            case_removed_counter: case_id
        }).exec();

    } catch (err) {
        console.error('DeleteCase updater error: ', err);
    }
}

export default deleteCaseHandler;