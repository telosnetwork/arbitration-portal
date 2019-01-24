import transferHandler from "./transfer";

export default [
    {
        actionType: "eosio.token::transfer",
        apply: transferHandler
    }
];