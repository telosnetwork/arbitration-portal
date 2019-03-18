import Claim from '../../models/claim.model';

/**
 * Get list of all claims confirmed from the blockchain
 * @returns {Claim[]}
 */

 export const listClaim = async (req, res) => {
    let claim_id       = req.query.claim_id;
    let decision_class = req.query.decision_class;

    try {
        if (claim_id) {
            const confirmedClaims = await Claim.find({ claim_id: claim_id }).exec();
            res.send(confirmedClaims);
        } else if (decision_class) {
            const confirmedClaims = await Claim.find({ decision_class: decision_class }).exec();
            res.send(confirmedClaims);
        } else {
            const confirmedClaims = await Claim.find({}).exec();
            res.send(confirmedClaims);
        }
    } catch (err) {
        console.error(err);
    }
 };