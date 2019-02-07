async function deleteCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('DeleteCase updater PAYLOAD:   ', payload);
        console.log('DeleteCase updater BlockInfo: ', blockInfo);

        let case_id = payload.data.case_id;

    } catch (err) {
        console.error('DeleteCase updater error: ', err);
    }
}

export default deleteCaseHandler;