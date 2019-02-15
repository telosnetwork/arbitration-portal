import withdrawHandler     from './withdraw';
import fileCaseHandler     from './fileCase';
import addClaimHandler     from './addClaim';
import removeClaimHandler  from './removeClaim';
import shredCaseHandler    from './shredCase';
import readyCaseHandler    from './readyCase';
import respondHandler      from './respond';
import addArbsHandler      from './addarbs';
import assignToCaseHandler from './assignToCase';
import dismissClaimHandler from './dismissClaim';
import acceptClaimHandler  from './acceptClaim';
import advanceCaseHandler  from './advanceCase';
import dismissCaseHandler  from './dismissCase';
// import resolveCaseHandler  from './resolveCase';
import recuseHandler       from './recuse';
// import newJoinderHandler   from './newjoinder';
// import joinCasesHandler    from './joincases';
import newArbStatusHandler from './newArbStatus';
import setLangCodesHandler from './setLangCodes';
import deleteCaseHandler   from './deleteCase';

export default [
    /**
     * Case_Setup 
     */
    {
        actionType: `${process.env.ARB_CONTRACT}::withdraw`,
        apply:      withdrawHandler
    },
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
    /**
     * Case_Progression
     */
    {
        actionType: `${process.env.ARB_CONTRACT}::respond`,
        apply:      respondHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::addarbs`,
        apply:      addArbsHandler
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
    // {
    //     actionType: `${process.env.ARB_CONTRACT}::resolvecase`,
    //     apply:      resolveCaseHandler
    // },
    {
        actionType: `${process.env.ARB_CONTRACT}::recuse`,
        apply:      recuseHandler
    },
    // {
    //     actionType: `${process.env.ARB_CONTRACT}::newjoinder`,
    //     apply:      newJoinderHandler
    // },
    // {
    //     actionType: `${process.env.ARB_CONTRACT}::joincases`,
    //     apply:      joinCasesHandler
    // },
    /**
     * Arb_Actions
     */
    {
        actionType: `${process.env.ARB_CONTRACT}::newarbstatus`,
        apply:      newArbStatusHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::setlangcodes`,
        apply:      setLangCodesHandler
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::deletecase`,
        apply:      deleteCaseHandler
    }
];