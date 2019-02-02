import fileCaseEffect     from './fileCase';
import addClaimEffect     from './addClaim';
import removeClaimEffect  from './removeClaim';
import shredCaseEffect    from './shredCase';
import readyCaseEffect    from './readyCase';
import assignToCaseEffect from './assignToCase';
import dismissClaimEffect from './dismissClaim';
import acceptClaimEffect  from './acceptClaim';
import advanceCaseEffect  from './advanceCase';
import dismissCaseEffect  from './dismissCase';
import resolveCaseEffect  from './resolveCase';
import newCfStatusEffect  from './newCfStatus';
import recuseEffect       from './recuse';
import newJoinderEffect   from './newJoinder';
import joinCasesEffect    from './joinCases';
import newArbStatusEffect from './newArbStatus';

export default [
    {
        actionType: `${process.env.ARB_CONTRACT}::filecase`,
        run:        fileCaseEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::addclaim`,
        run:        addClaimEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::removeclaim`,
        run:        removeClaimEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::shredcase`,
        run:        shredCaseEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::readycase`,
        run:        readyCaseEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::assigntocase`,
        run:        assignToCaseEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::dismissclaim`,
        run:        dismissClaimEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::acceptclaim`,
        run:        acceptClaimEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::advancecase`,
        run:        advanceCaseEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::dismisscase`,
        run:        dismissCaseEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::resolvecase`,
        run:        resolveCaseEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::newcfstatus`,
        run:        newCfStatusEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::recuse`,
        run:        recuseEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::newjoinder`,
        run:        newJoinderEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::joincases`,
        run:        joinCasesEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::newarbstatus`,
        run:        newArbStatusEffect
    }
];