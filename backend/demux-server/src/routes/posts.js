import { Router }          from 'express';
import { listBalance }     from '../services/post/listBalance';
import { listCase }        from '../services/post/listCase';
import { listClaim }       from '../services/post/listClaim';
import { listArbitrator }  from '../services/post/listArbitrator';
// import { listJoinedCases } from '../services/post/listJoinedCases';
import { listTransfers }   from '../services/post/listTransfers';

export default () => {
    let api = Router;

    api.get('/', (req, res) => {
        res.send('Telos Portal')
    });

    /**
     * List of routes to return results from the off-chain store
     */
    api.get('/balance',    listBalance);

    api.get('/case',       listCase);

    api.get('/claim',      listClaim);

    api.get('/arbitrator', listArbitrator);

    // api.get('/joinedcases', listJoinedCases);

    api.get('/transfers',  listTransfers);

    return api;
}