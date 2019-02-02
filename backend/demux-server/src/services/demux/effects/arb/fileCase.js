function fileCaseEffect(payload, blockInfo, context) {
    try {
        console.log('FileCase effect PAYLOAD:   ',  payload);
        console.log('FileCase effect BlockInfo: ', blockInfo);   
    } catch (err) {
        console.error('FileCase effect error: ', err);
    }
}

export default fileCaseEffect;