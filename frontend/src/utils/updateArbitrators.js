import axios from  "axios";

export const updateArbitrators = async (prevState, updatedArbitrator) => {

    let isFound    = false;
    let updatedArb = updatedArbitrator.arbitrator;

    let url = `${process.env.REACT_APP_API_URL}/posts/arbitrator`;
    let qs  = `?arb=${updatedArb}`;

    updatedArbitrator = await axios.get(url + qs);

    let updatedArbitrators = prevState.arbitrators.map(arbitrator => {
        if (arbitrator.arb === updatedArbitrator.arb) {
            isFound = true;
            return updatedArbitrator;
        }
        return arbitrator;
    });

    if (!isFound) {
        updatedArbitrators = [{ ...updatedArbitrator }, updatedArbitrators];
    }

    return updatedArbitrators;
};