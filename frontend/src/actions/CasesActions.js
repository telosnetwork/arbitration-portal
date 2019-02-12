import { ActionTypes } from 'const';

class CasesAction {

    static setCases({ case_id, case_status, claimant, respondant, arbitrators, required_langs, unread_claims, accepted_claims, case_ruling, arb_comment }) {
        return {
            type: ActionTypes.SET_CASES,
            case_id,
            case_status,
            claimant,
            respondant,
            arbitrators,
            required_langs,
            unread_claims,
            accepted_claims,
            case_ruling,
            arb_comment
        }        
    }
}

export default CasesAction;