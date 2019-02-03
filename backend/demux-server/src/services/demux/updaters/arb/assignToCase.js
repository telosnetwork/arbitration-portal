async function assignToCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('AssignToCase updater PAYLOAD:   ', payload);
        console.log('AssignToCase updater BlockInfo: ', blockInfo);

        // case_id && arb_to_assign
    } catch (err) {
        console.error('AssignToCase updater error: ', err);
    }
}

export default assignToCaseHandler;