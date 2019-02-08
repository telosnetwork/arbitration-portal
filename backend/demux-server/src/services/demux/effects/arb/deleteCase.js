function deleteCaseEffect(payload, blockInfo, context) {
    try {
        console.log('DeleteCase effect PAYLOAD:   ', payload);
        console.log('DeleteCase effect BlockInfo: ', blockInfo);   

        const post = {
            trxHash:   payload.transactionId,
            blockHash: blockInfo.blockHash,
            timestamp: blockInfo.timestamp,
            case_id:   payload.data.case_id
        };
        context.socket.emit('deleteCaseAction', post);
    } catch (err) {
        console.error('DeleteCase effect error: ', err);
    }
}

export default deleteCaseEffect;