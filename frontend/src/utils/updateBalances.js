import axios from "axios";

export const updateBalances = async (prevState, updatedBalance) => {

    let isFound = false;
    let updatedOwner = updatedBalance.owner;

    let url = `${process.env.REACT_APP_API_URL}/posts/balance`;
    let qs  = `?owner=${updatedOwner}`;

    updatedBalance = await axios.get(url + qs);

    let updatedBalances = prevState.balances.map(balance => {
        if ((balance.id === updatedBalance.id) && (balance.owner === updatedBalance.owner)) {
            isFound = true;
            return updatedBalance;
        }
        return balance;
    });

    if (!isFound) {
        updatedBalances = [{ ...updatedBalance }, ...updatedBalances ];
    }

    console.log(updatedBalances);
    
    return updatedBalances;
};