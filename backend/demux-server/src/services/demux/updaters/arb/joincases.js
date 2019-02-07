async function joinCasesHandler (state, payload, blockInfo, context) {
    try {
        console.log('JoinCases updater PAYLOAD:   ', payload);
        console.log('JoinCases updater BlockInfo: ', blockInfo);

    } catch (err) {
        console.error('JoinCases updater error: ', err);
    }
}

export default joinCasesHandler;