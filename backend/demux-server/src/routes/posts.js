import { Router }          from 'express';
import { listArbitrator }  from '../services/post/listArbitrator';
import { listCase }        from '../services/post/listCase';
import { listBalance }     from '../services/post/listBalance';
import { listClaim }       from '../services/post/listClaim';
import { listJoinedCases } from '../services/post/listJoinedCases';
import { listTransfers }   from '../services/post/listTransfers';

export default () => {

    let api = Router();

    api.get('/', (req, res) => {
        res.send('Welcome to the Telos Portal');
    });

    /**
     * List of routes to return results from the off-chain store
     * @return {Object[]}
     */
    api.get('/arbitrator', listArbitrator);
    api.get('/case',       listCase);
    api.get('/balance',    listBalance);
    api.get('/claim',      listClaim);
    api.get('/joinedcases', listJoinedCases);
    api.get('/transfers',  listTransfers);

    return api;
}