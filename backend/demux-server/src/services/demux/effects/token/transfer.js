function transferEffect(payload, blockInfo, context) {
    try {
        console.log('Transfer effect PAYLOAD:   ',  payload);
        console.log('Transfer effect BlockInfo: ', blockInfo);   
    } catch (err) {
        console.error('Transfer effect error: ', err);
    }
}

export default transferEffect;