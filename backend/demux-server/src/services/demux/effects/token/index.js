import transferEffect from "./transfer";

export default [
    {
        actionType: "eosio.token::transfer",
        run: transferEffect
    }
];