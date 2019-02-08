import axios from "axios";

export const updateBalances = async (prevState, updatedBalance) => {

    let isFound  = false;
    let updatedOwner = updateBalance.owner;

    const updatedBalance = await axios.get(`${process.env.REACT_APP_API_URL}/posts/balance` + `?owner=${updatedOwner}`);

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

    return updatedBalances;
};