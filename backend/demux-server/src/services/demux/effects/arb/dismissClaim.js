function dismissClaimEffect(payload, blockInfo, context) {
    try {
        console.log('DismissClaim effect PAYLOAD:   ', payload);
        console.log('DismissClaim effect BlockInfo: ', blockInfo);   

        context.socket.emit('dismissClaimAction');
    } catch (err) {
        console.error('DismissClaim effect error: ', err);
    }
}

export default dismissClaimEffect;