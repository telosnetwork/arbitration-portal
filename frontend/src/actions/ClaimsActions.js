import { ActionTypes } from 'const';

class ClaimsAction {

    static setClaims({ claim_id, claim_summary, decision_link, decision_class }) {
        return {
            type: ActionTypes.SET_CLAIMS,
            claim_id,
            claim_summary,
            decision_link,
            decision_class
        }        
    }
}

export default ClaimsAction;