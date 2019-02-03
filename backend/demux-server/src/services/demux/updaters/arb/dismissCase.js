async function dismissCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('DismissCase updater PAYLOAD:   ', payload);
        console.log('DismissCase updater BlockInfo: ', blockInfo);

        // case_id, assigned_arb, ruling_link
    } catch (err) {
        console.error('DismissCase updater error: ', err);
    }
}

export default dismissCaseHandler;