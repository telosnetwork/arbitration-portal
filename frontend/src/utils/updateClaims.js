import axios from  "axios";

export const updatedClaims = async (prevState, updatedClaim) => {

    let isFound = false;

    let counters = await axios.get(`${process.env.REACT_APP_API_URL}/posts/counter`);
    let updatedClaimId = counters.claim_counter;

    let updatedClaim = await axios.get(`${process.env.REACT_APP_API_URL}/posts/claim` + `?claim_id=${updatedClaimId}`);
    
    let updatedClaims = prevState.claims.map(claim => {
        if (claim.claim_id === updatedClaim.claim_id) {
            isFound = true;
            return updatedClaim;
        }
        return claim;
    });

    if (!isFound) {
        updatedClaims = [{ ...updatedClaim }, updatedClaims ];
    }
    
    return updatedClaims;
};