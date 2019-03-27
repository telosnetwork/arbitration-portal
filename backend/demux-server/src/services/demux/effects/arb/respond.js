function respondEffect(payload, blockInfo, context) {
    try {
        console.log('Respond effect PAYLOAD:   ', payload);
        console.log('Respond effect BlockInfo: ', blockInfo);

        context.socket.emit('respondAction');
    } catch (err) {
        console.error('Respond effect error: ', err);
    }
}

export default respondEffect;