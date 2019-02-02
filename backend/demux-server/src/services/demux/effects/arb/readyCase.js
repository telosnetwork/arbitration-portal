function readyCaseEffect(payload, blockInfo, context) {
    try {
        console.log('ReadyCase effect PAYLOAD:   ',  payload);
        console.log('ReadyCase effect BlockInfo: ', blockInfo);   
    } catch (err) {
        console.error('ReadyCase effect error: ', err);
    }
}

export default readyCaseEffect;