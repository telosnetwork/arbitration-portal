function setLangCodesEffect(payload, blockInfo, context) {
    try {
        console.log('SetLangCodes effect PAYLOAD:   ', payload);
        console.log('SetLangCodes effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash:    payload.transactionId,
            blockHash:  blockInfo.blockHash,
            timestamp:  blockInfo.timestamp,
            arbitrator: payload.data.arbitrator,
            lang_codes: payload.data.lang_codes
        };
        context.socket.emit('setLangCodesAction', post);
    } catch (err) {
        console.error('SetLangCodes effect error: ', err);
    }
}

export default setLangCodesEffect;