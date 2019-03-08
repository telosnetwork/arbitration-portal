import axios from  "axios";

export async function call({ path='', params={}, method='GET'}) {

    const qs = Object.keys(params).reduce((acc, key) => `${acc}&${key}=${params[key]}`,'?');

    let url = process.env.REACT_APP_API_URL;
    url += path;
    url += qs;

    let result = await axios.get(url);

    return result.data;

}

export async function getCases(caseId, caseStatus, claimant, respondant) {
    const params = {};
    if (caseId) {
        params.case_id = caseId;
    } else if (caseStatus) {
        params.case_status = caseStatus;
    } else if (claimant) {
        params.claimant = claimant;
    } else if (respondant) {
        params.respondant = respondant;
    }
    return call({
        method: 'GET',
        path: '/posts/case',
        params,
    });
}

export async function getClaims(claimId, decisionClass) {
    const params = {};
    if (claimId) {
        params.claim_id = claimId;
    } else if (decisionClass) {
        params.decision_class = decisionClass;
    }
    return call({
        method: 'GET',
        path: '/posts/claim',
        params
    });
}

export async function getArbitrators(arbitrator, arbStatus) {
    const params = {};
    if (arbitrator) {
        params.arb = arbitrator;
    } else if (arbStatus) {
        params.arb_status = arbStatus;
    }
    return call({
        method: 'GET',
        path: '/posts/arbitrator',
        params
    });
}