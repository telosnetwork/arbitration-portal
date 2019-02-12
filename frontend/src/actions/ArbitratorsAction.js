import { ActionTypes } from 'const';

class ArbitratorsAction {

    static setArbitrators({ arb, arb_status, open_case_ids, closed_case_ids, credentials_link, elected_time, term_expiration, languages }) {
        return {
            type: ActionTypes.SET_ARBITRATORS,
            arb,
            arb_status,
            open_case_ids,
            closed_case_ids,
            credentials_link,
            elected_time,
            term_expiration,
            languages
        }        
    }
}

export default ArbitratorsAction;