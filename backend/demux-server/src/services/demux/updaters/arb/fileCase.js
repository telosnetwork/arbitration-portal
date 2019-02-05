async function fileCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('FileCase updater PAYLOAD:   ', payload);
        console.log('FileCase updater BlockInfo: ', blockInfo);

        // Case_Id
        let case_counter = 0;
        let counters = await state.counter.findOne({}).exec();
        if (counters) {
            ({ case_counter } = counters)
            case_counter += 1;
            await state.counter.updateOne({}, {
                $inc: { case_counter: 1 }
            }, { upsert: true }).exec();
        }

        // Case_Status
        let case_status    = 0; // CASE_SETUP (0)

        // Claimants
        let claimants      = payload.data.claimant;

        // Unread Claims
        let unread_claims = {
            claim_id:      0,
            claim_summary: payload.data.claim_link,
            decision_link: '' 
        };

        await state.case.create({
            case_id:        case_counter,
            case_status:    case_status,
            claimants:      [claimants],
            unread_claims:  [unread_claims]
        }).exec();
    } catch (err) {
        console.error('FileCase updater error: ', err);
    }
}

export default fileCaseHandler;