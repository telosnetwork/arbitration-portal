import { ActionTypes } from 'const';

class ArbitratorsAction {

    static setArbitrators({ arb, arb_status, open_case_ids, closed_case_ids, credentials_link, elected_time, term_expiration, languages }) {
        return {
            type: ActionTypes.SET_ARBITRATORS,
            arb,              // Arbitrator
            arb_status,       // Arbitrator Status
            open_case_ids,
            closed_case_ids,
            credentials_link, // IPFS Link of Arbitrator Credentials
            elected_time,
            term_expiration,
            languages         // Language Codes
        }        
    }
}

export default ArbitratorsAction;