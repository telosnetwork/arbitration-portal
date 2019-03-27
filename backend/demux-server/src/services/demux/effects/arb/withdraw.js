function withdrawEffect(payload, blockInfo, context) {
    try {
        console.log('Withdraw effect PAYLOAD: ', payload);
        console.log('Withdraw effect BlockInfo: ', blockInfo);

        context.socket.emit('withdrawAction');
    } catch (err) {
        console.error('Withdraw effect error: ', err);
    }
}

export default withdrawEffect;