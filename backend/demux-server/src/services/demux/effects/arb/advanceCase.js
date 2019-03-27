function advanceCaseEffect(payload, blockInfo, context) {
    try {
        console.log('AdvanceCase effect PAYLOAD:   ', payload);
        console.log('AdvanceCase effect BlockInfo: ', blockInfo);   

        context.socket.emit('advanceCaseAction');
    } catch (err) {
        console.error('AdvanceCase effect error: ', err);
    }
}

export default advanceCaseEffect;