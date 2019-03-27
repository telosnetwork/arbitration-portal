function addArbsEffect(payload, blockInfo, context) {
    try {
        console.log('AddArbs effect PAYLOAD:   ', payload);
        console.log('AddArbs effect BlockInfo: ', blockInfo); 
        
        context.socket.emit('addArbsAction');
    } catch (err) {
        console.error('AddArbs effect error: ', err);
    }
}

export default addArbsEffect;