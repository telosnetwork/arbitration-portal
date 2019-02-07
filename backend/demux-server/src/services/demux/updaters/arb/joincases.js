async function joinCasesHandler (state, payload, blockInfo, context) {
    try {
        console.log('JoinCases updater PAYLOAD:   ', payload);
        console.log('JoinCases updater BlockInfo: ', blockInfo);

        let joinder_id  = payload.data.joinder_id;

        let new_case_id = payload.data.new_case_id;

        let arb         = payload.data.arb;

    } catch (err) {
        console.error('JoinCases updater error: ', err);
    }
}

export default joinCasesHandler;