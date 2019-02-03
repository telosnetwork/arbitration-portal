function assignToCaseEffect(payload, blockInfo, context) {
    try {
        console.log('AssignToCase effect PAYLOAD:   ', payload);
        console.log('AssignToCase effect BlockInfo: ', blockInfo);   
    } catch (err) {
        console.error('AssignToCase effect error: ', err);
    }
}

export default assignToCaseEffect;