function newCfStatusEffect(payload, blockInfo, context) {
    try {
        console.log('NewCfStatus effect PAYLOAD:   ', payload);
        console.log('NewCfStatus effect BlockInfo: ', blockInfo);   
    } catch (err) {
        console.error('NewCfStatus effect error: ', err);
    }
}

export default newCfStatusEffect;