import { ActionTypes } from 'const';

class JoinedCasesAction {

    static setJoinedCases({ join_id, cases, join_time, joined_by }) {
        return {
            type: ActionTypes.SET_JOINEDCASES,
            join_id,
            cases,
            join_time,
            joined_by
        }        
    }
}

export default JoinedCasesAction;