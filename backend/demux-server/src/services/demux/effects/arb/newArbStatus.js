function newArbStatusEffect(payload, blockInfo, context) {
    try {
        console.log('NewArbStatus effect PAYLOAD:   ', payload);
        console.log('NewArbStatus effect BlockInfo: ', blockInfo);   
    } catch (err) {
        console.error('NewArbStatus effect error: ', err);
    }
}

export default newArbStatusEffect;