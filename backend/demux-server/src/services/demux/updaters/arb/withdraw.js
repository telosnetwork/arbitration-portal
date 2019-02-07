async function withdrawHandler (state, payload, blockInfo, context) {
    try {
        console.log('Withdraw updater PAYLOAD: ', payload);
        console.log('Withdraw updater BlockInfo ', blockInfo);

        let owner = payload.data.owner;

        await state.balance.findOneAndDelete({ owner: owner }).exec();

    } catch (err) {
        console.error('Withdraw updater error: ', err);
    }
}

export default withdrawHandler;