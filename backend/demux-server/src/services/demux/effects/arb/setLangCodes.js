function setLangCodesEffect(payload, blockInfo, context) {
    try {
        console.log('SetLangCodes effect PAYLOAD:   ', payload);
        console.log('SetLangCodes effect BlockInfo: ', blockInfo);   

        context.socket.emit('setLangCodesAction');
    } catch (err) {
        console.error('SetLangCodes effect error: ', err);
    }
}

export default setLangCodesEffect;