import Counter from '../../models/counter.model';

/**
 * Get list of all counters confirmed from the blockchain
 * @returns {Counter[]}
 */

 export const listCounters = async (req, res) => {
     try {
        const confirmedCounters = await Counter.find({}).exec();
        res.send(confirmedCounters);
     } catch (err) {
         console.error(err);
     }
 };