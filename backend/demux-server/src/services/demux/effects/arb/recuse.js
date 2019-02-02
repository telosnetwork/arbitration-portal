function recuseEffect(payload, blockInfo, context) {
    try {
        console.log('Recuse effect PAYLOAD:   ',  payload);
        console.log('Recuse effect BlockInfo: ', blockInfo);   
    } catch (err) {
        console.error('Recuse effect error: ', err);
    }
}

export default recuseEffect;