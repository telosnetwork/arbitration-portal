import axios from  "axios";

export const updateArbitrators = async (prevState, updatedArbitrator) => {

    let isFound    = false;
    let updatedArb = updatedArbitrator.arbitrator;

    const updatedArbitrator = await axios.get(`${process.env.REACT_APP_API_URL}/posts/arbitrator` + `?arb=${updatedArb}`);

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