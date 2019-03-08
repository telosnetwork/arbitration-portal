import axios from  "axios";

export async function call({ path='', params={}, method='GET'}) {

    const qs = Object.keys(params).reduce((acc, key) => `${acc}&${key}=${params[key]}`,'?');

    let url = process.env.REACT_APP_API_URL;
    url += path;
    url += qs;

    let result = await axios.get(url);

    return result.data;

}

export async function getCases(caseId) {
    const params = {};
    if (caseId) {
        params.case_id = caseId;
    }
    return call({
        method: 'GET',
        path: '/posts/case',
        params,
    });
}