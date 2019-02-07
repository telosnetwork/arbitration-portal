async function newArbStatusHandler (state, payload, blockInfo, context) {
    try {
        console.log('NewArbStatus updater PAYLOAD:   ', payload);
        console.log('NewArbStatus updater BlockInfo: ', blockInfo);

        let arbitrator = payload.data.arbitrator;

        // Arbitrator Status
        let arb_status = payload.data.new_status;

        await state.arbitrator.findOneAndUpdate({ arb: arbitrator }, {
            arb:        arbitrator,
            arb_status: arb_status
        }, { upsert: true }).exec();
    } catch (err) {
        console.error('NewArbStatus updater error: ', err);
    }
}

export default newArbStatusHandler;