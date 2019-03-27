function removeClaimEffect(payload, blockInfo, context) {
    try {
        console.log('RemoveClaim effect PAYLOAD:   ', payload);
        console.log('RemoveClaim effect BlockInfo: ', blockInfo);   

        context.socket.emit('removeClaimAction');
    } catch (err) {
        console.error('RemoveClaim effect error: ', err);
    }
}

export default removeClaimEffect;