import transferEffect from './transfer';

export default [
    {
        actionType: `${process.env.TELOS_CONTRACT}::transfer`,
        run:        transferEffect
    }
];