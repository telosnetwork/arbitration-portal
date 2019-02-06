import { Balance } from '../../models';

/**
 * Get list of all balances confirmed from the blockchain
 * @returns {Balance[]}
 */

 export const listBalance = async (req, res) => {
    let id    = req.query.id;
    let owner = req.query.owner;

    try {
        if (id && owner) {
            const confirmedBalances = await Balance.find({ id: id, owner: owner }).exec();
            res.send(confirmedBalances);
        } else if (id) {
            const confirmedBalances = await Balance.find({ id: id }).exec();
            res.send(confirmedBalances);
        } else if (owner) {
            const confirmedBalances = await Balance.find({ owner: owner }).exec();
            res.send(confirmedBalances);
        }
    } catch (err) {
        console.error(err);
    }
 };