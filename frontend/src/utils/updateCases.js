import axios from  "axios";

export const updatedCases = async (prevState, updatedCase) => {

    let isFound = false;

    let counters = await axios.get(`${process.env.REACT_APP_API_URL}/posts/counter`);
    let updatedCaseId = counters.case_counter;

    let updatedCase = await axios.get(`${process.env.REACT_APP_API_URL}/posts/case` + `?case_id=${updatedCaseId}`);

    let updatedCases = prevState.cases.map(postCase => {
        if (postCase.case_id === updatedCase.case_id) {
            isFound = true;
            return updatedCase;
        }
        return postCase;
    });

    if (!isFound) {
        updatedCases = [{ ...updatedCase }, ...updatedCases ];
    }

    return updatedCases;
};