async function newJoinderHandler (state, payload, blockInfo, context) {
    try {
        console.log('NewJoinder updater PAYLOAD:   ', payload);
        console.log('NewJoinder updater BlockInfo: ', blockInfo);

        let base_case_id    = payload.data.base_case_id;

        let joining_case_id = payload.data.joining_case_id;

        let arb             = payload.data.arb;

    } catch (err) {
        console.error('NewJoinder updater error: ', err);
    }
}

export default newJoinderHandler;