function dismissCaseEffect(payload, blockInfo, context) {
    try {
        console.log('DismissCase effect PAYLOAD:   ', payload);
        console.log('DismissCase effect BlockInfo: ', blockInfo);   

        context.socket.emit('dismissCaseAction');
    } catch (err) {
        console.error('DismissCase effect error: ', err);
    }
}

export default dismissCaseEffect;