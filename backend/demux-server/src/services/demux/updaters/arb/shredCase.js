async function shredCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('ShredCase updater PAYLOAD:   ', payload);
        console.log('ShredCase updater BlockInfo: ', blockInfo);

        let case_id = parseInt(payload.data.case_id);

        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        let unread_claims;
        if (caseState) {
            ({ unread_claims } = caseState);
            // Delete All Claims
            for ( let claim of unread_claims ) {
                unread_claims.splice(unread_claims.indexOf(claim), 1);
            }
            // Delete|Remove CaseFile
            await state.case.findOneAndDelete({ case_id: case_id }).exec();
        }
    } catch (err) {
        console.error('ShredCase updater error: ', err);
    }
}

export default shredCaseHandler;