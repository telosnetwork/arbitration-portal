import Counter from '../../models/counter.model';

/**
 * Get list of all counters confirmed from the blockchain
 * @returns {Counter[]}
 */

 export const listCounters = async (req, res) => {
    let type = req.query.type;

     try {
         if (type === 'case') {
            const confirmedCounters = await Counter.find({ case_counter: { $exists: true } }).exec();
            res.send(confirmedCounters);
         } else if (type === 'claim') {
            const confirmedCounters = await Counter.find({ claim_counter: { $exists: true } }).exec();
            res.send(confirmedCounters);
         }
     } catch (err) {
         console.error(err);
     }
 };