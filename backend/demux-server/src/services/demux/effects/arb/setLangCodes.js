function setLangCodesEffect(payload, blockInfo, context) {
    try {
        console.log('SetLangCodes effect PAYLOAD:   ', payload);
        console.log('SetLangCodes effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash:    payload.transactionId,
            arbitrator: payload.data.arbitrator
        };
        context.socket.emit('setLangCodesAction', post);
    } catch (err) {
        console.error('SetLangCodes effect error: ', err);
    }
}

export default setLangCodesEffect;