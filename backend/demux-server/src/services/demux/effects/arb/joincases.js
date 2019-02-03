function joinCasesEffect(payload, blockInfo, context) {
    try {
        console.log('JoinCases effect PAYLOAD:   ', payload);
        console.log('JoinCases effect BlockInfo: ', blockInfo);   
    } catch (err) {
        console.error('JoinCases effect error: ', err);
    }
}

export default joinCasesEffect;