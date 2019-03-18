import Case from '../../models/case.model';

/**
 * Get list of all cases confirmed from the blockchain
 * @returns {Case[]}
 */

 export const listCase = async (req, res) => {
    let case_id     = req.query.case_id;
    let case_status = req.query.case_status;
    let claimant    = req.query.member;
    let respondant  = req.query.respondant;

    try {
        if (case_id) {
            const confirmedCases = await Case.find({ case_id: case_id }).exec();
            res.send(confirmedCases);        
        } else if (case_status) {
            const confirmedCases = await Case.find({ case_status: case_status }).exec();
            res.send(confirmedCases);
        } else if (claimant) {
            const confirmedCases = await Case.find({ claimant: claimant }).exec();
            res.send(confirmedCases);
        } else if (respondant) {
            const confirmedCases = await Case.find({ respondant: respondant }).exec();
            res.send(confirmedCases);
        } else {
            const confirmedCases = await Case.find({}).exec();
            res.send(confirmedCases);
        }
    } catch (err) {
        console.error(err);
    }
 };