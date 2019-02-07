import { Arbitrator } from '../../models';

/**
 * Get list of all arbitrators confirmed from the blockchain
 * @returns {Arbitrator[]}
 */

 export const listArbitrator = async (req, res) => {
    let arb        = req.query.arb;
    let arb_status = req.query.arb_status; 

    try {
        if (arb && arb_status) {
            const confirmedArbitrators = await Arbitrator.find({ arb: arb, arb_status: arb_status }).exec();
            res.send(confirmedArbitrators);
        } else if (arb) {
            const confirmedArbitrators = await Arbitrator.find({ arb: arb }).exec();
            res.send(confirmedArbitrators);
        } else if (arb_status) {
            const confirmedArbitrators = await Arbitrator.find({ arb_status: arb_status }).exec();
            res.send(confirmedArbitrators);
        } else {
            const confirmedArbitrators = await Arbitrator.find({}).exec();
            res.send(confirmedArbitrators);
        }
    } catch (err) {
        console.error(err);
    }
 };