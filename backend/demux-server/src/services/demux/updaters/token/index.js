import transferHandler from './transfer';

export default [
    {
        actionType: `${process.env.TELOS_CONTRACT}::transfer`,
        apply:      transferHandler
    }
];