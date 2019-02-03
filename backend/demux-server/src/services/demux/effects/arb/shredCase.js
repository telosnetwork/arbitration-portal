function shredCaseEffect(payload, blockInfo, context) {
    try {
        console.log('ShredCase effect PAYLOAD:   ', payload);
        console.log('ShredCase effect BlockInfo: ', blockInfo);   
    } catch (err) {
        console.error('ShredCase effect error: ', err);
    }
}

export default shredCaseEffect;