function setLangCodesEffect(payload, blockInfo, context) {
    try {
        console.log('SetLangCodes effect PAYLOAD:   ', payload);
        console.log('SetLangCodes effect BlockInfo: ', blockInfo);   
    } catch (err) {
        console.error('SetLangCodes effect error: ', err);
    }
}

export default setLangCodesEffect;