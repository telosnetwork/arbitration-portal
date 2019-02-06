import { Transfer } from '../../models';

/**
 * Get list of all transfers confirmed from the blockchain
 * @returns {Transfer[]}
 */

 export const listTransfers = async (req, res) => {
    let trxHash = req.query.trxHash;
    let from    = req.query.from;
    let to      = req.query.to;

    try {
        if (trxHash) {
            const confirmedTransfers = await Transfer.find({ trxHash: trxHash }).exec();
            res.send(confirmedTransfers);
        } else {
            if (from && to) {
                const confirmedTransfers = await Transfer.find({ from: from, to: to }).exec();
                res.send(confirmedTransfers);
            } else if (from) {
                const confirmedTransfers = await Transfer.find({ from: from }).exec();
                res.send(confirmedTransfers);
            } else if (to) {
                const confirmedTransfers = await Transfer.find({ to: to }).exec();
                res.send(confirmedTransfers);
            }
        }
    } catch (err) {
        console.error(err);
    }
 };