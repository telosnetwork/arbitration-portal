import { Arbitrator } from '../../models';

/**
 * Get list of all arbitrators confirmed from the blockchain
 * @returns {Arbitrator[]}
 */

 export const listArbitrator = async (req, res) => {
    let name       = req.query.name;
    let arb_status = req.query.arb_status; 

    try {
        if (name && arb_status) {
            const confirmedArbitrators = await Arbitrator.find({ name: name, arb_status: arb_status }).exec();
            res.send(confirmedArbitrators);
        } else if (name) {
            const confirmedArbitrators = await Arbitrator.find({ name: name }).exec();
            res.send(confirmedArbitrators);
        } else if (arb_status) {
            const confirmedArbitrators = await Arbitrator.find({ arb_status: arb_status }).exec();
            res.send(confirmedArbitrators);
        }
    } catch (err) {
        console.error(err);
    }
 };