import { ActionTypes } from 'const';

class CasesAction {

    static setCases({ case_id, case_status, claimant, respondant, arbitrators, approvals, required_langs, unread_claims, accepted_claims, case_ruling, arb_comment }) {
        return {
            type: ActionTypes.SET_CASES,
            case_id,
            case_status,
            claimant,
            respondant,
            arbitrators,
            approvals,      // Arbitrators that approved to AdvanceCase
            required_langs, // Required List of Language Codes
            unread_claims,
            accepted_claims,
            case_ruling,    // IPFS Link to Ruling Doc
            arb_comment
        }        
    }
}

export default CasesAction;