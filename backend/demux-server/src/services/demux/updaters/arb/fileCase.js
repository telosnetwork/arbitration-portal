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
        } else {
            await state.counter.create({
                case_counter: case_counter
            });
        }
        
        // Case_Status
        let case_status    = 0; // CASE_SETUP (0)

        // Claimants
        let claimant       = payload.data.claimant;

        // Unread Claims
        let unread_claims  = {
            claim_id:      0,
            claim_summary: payload.data.claim_link,
            decision_link: '' 
        };

        // Lang_Codes
        let lang_codes    = payload.data.lang_codes;

        // Respondants
        let respondant    = payload.data.respondant;

        await state.case.create({
            case_id:        case_counter,
            case_status:    case_status,
            claimant:       claimant,
            respondant:     respondant,
            required_langs: lang_codes,
            unread_claims:  [unread_claims]
        });
    } catch (err) {
        console.error('FileCase updater error: ', err);
    }
}

export default fileCaseHandler;