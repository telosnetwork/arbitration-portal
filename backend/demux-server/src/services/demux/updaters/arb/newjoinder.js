async function newJoinderHandler (state, payload, blockInfo, context) {
    try {
        console.log('NewJoinder updater PAYLOAD:   ', payload);
        console.log('NewJoinder updater BlockInfo: ', blockInfo);

    } catch (err) {
        console.error('NewJoinder updater error: ', err);
    }
}

export default newJoinderHandler;