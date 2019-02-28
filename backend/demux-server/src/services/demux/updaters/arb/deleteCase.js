async function deleteCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('DeleteCase updater PAYLOAD:   ', payload);
        console.log('DeleteCase updater BlockInfo: ', blockInfo);

        let case_id = parseInt(payload.data.case_id);

        // Delete|Remove CaseFile

        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        let accepted_claims;
        if (caseState) {
            ({ accepted_claims } = caseState);
            for ( let claim_id of accepted_claims ) {
                await state.claim.findOneAndDelete({ claim_id: claim_id }).exec();
            }
            await state.case.findOneAndDelete({ case_id: case_id }).exec();
        }
    } catch (err) {
        console.error('DeleteCase updater error: ', err);
    }
}

export default deleteCaseHandler;