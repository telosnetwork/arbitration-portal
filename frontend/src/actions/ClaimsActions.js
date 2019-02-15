import { ActionTypes } from 'const';

class ClaimsAction {

    static setClaims({ claim_id, claim_summary, decision_link, decision_class }) {
        return {
            type: ActionTypes.SET_CLAIMS,
            claim_id,
            claim_summary, // IPFS Link to Claimant Claim Document
            decision_link, // IPFS Link to Arbitrator Decision Document
            response_link, // IPFS Link to Respondant Response Document
            decision_class 
        }        
    }
}

export default ClaimsAction;