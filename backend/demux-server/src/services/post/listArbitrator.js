import Arbitrator from '../../models/arbitrator.model';

/**
 * Get list of all arbitrators confirmed from the blockchain
 * @returns {Arbitrator[]}
 */

 export const listArbitrator = async (req, res) => {
    let arb = req.query.arb;

    try {
        if (arb) {
            const confirmedArbitrators = await Arbitrator.find({ arb: arb }).exec();
            res.send(confirmedArbitrators);
        } else {
            const confirmedArbitrators = await Arbitrator.find({}).exec();
            res.send(confirmedArbitrators);
        }
    } catch (err) {
        console.error(err);
    }
 };