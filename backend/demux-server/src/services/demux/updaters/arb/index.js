import fileCaseHandler     from './fileCase';
import addClaimHandler     from './addClaim';
import removeClaimHandler  from './removeClaim';
import shredCaseHandler    from './shredCase';
import readyCaseHandler    from './readyCase';
import assignToCaseHandler from './assignToCase';
import dismissClaimHandler from './dismissClaim';
import acceptClaimHandler  from './acceptClaim';
import advanceCaseHandler  from './advanceCase';
import dismissCaseHandler  from './dismissCase';
import resolveCaseHandler  from './resolveCase';
import newCfStatusHandler  from './newcfstatus';
import recuseHandler       from './recuse';
import newJoinderHandler   from './newjoinder';
import joinCasesHandler    from './joincases';
import newArbStatusHandler from './newArbStatus';

export default [
    {
        actionType: `${process.env.ARB_CONTRACT}::filecase`,
        apply:      fileCaseHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::addclaim`,
        apply:      addClaimHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::removeclaim`,
        apply:      removeClaimHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::shredcase`,
        apply:      shredCaseHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::readycase`,
        apply:      readyCaseHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::assigntocase`,
        apply:      assignToCaseHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::dismissclaim`,
        apply:      dismissClaimHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::acceptclaim`,
        apply:      acceptClaimHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::advancecase`,
        apply:      advanceCaseHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::dismisscase`,
        apply:      dismissCaseHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::resolvecase`,
        apply:      resolveCaseHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::newcfstatus`,
        apply:      newCfStatusHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::recuse`,
        apply:      recuseHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::newjoinder`,
        apply:      newJoinderHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::joincases`,
        apply:      joinCasesHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::newarbstatus`,
        apply:      newArbStatusHandler
    }
];