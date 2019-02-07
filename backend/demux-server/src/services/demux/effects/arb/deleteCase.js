function deleteCaseEffect(payload, blockInfo, context) {
    try {
        console.log('DeleteCase effect PAYLOAD:   ', payload);
        console.log('DeleteCase effect BlockInfo: ', blockInfo);   
    } catch (err) {
        console.error('DeleteCase effect error: ', err);
    }
}

export default deleteCaseEffect;