function advanceCaseEffect(payload, blockInfo, context) {
    try {
        console.log('AdvanceCase effect PAYLOAD:   ',  payload);
        console.log('AdvanceCase effect BlockInfo: ', blockInfo);   
    } catch (err) {
        console.error('AdvanceCase effect error: ', err);
    }
}

export default AdvanceCase;