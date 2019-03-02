import withdrawEffect     from './withdraw';
import fileCaseEffect     from './fileCase';
import addClaimEffect     from './addClaim';
import removeClaimEffect  from './removeClaim';
import shredCaseEffect    from './shredCase';
import readyCaseEffect    from './readyCase';
import respondEffect      from './respond';
import addArbsEffect      from './addarbs';
import assignToCaseEffect from './assignToCase';
import dismissClaimEffect from './dismissClaim';
import acceptClaimEffect  from './acceptClaim';
import advanceCaseEffect  from './advanceCase';
import dismissCaseEffect  from './dismissCase';
import setRulingEffect    from './setRuling';
import recuseEffect       from './recuse';
// import newJoinderEffect   from './newjoinder';
// import joinCasesEffect    from './joinCases';
import newArbStatusEffect from './newArbStatus';
import setLangCodesEffect from './setLangCodes';
import deleteCaseEffect   from './deleteCase';

export default [
    /**
     * Case_Setup 
     */
    {
        actionType: `${process.env.ARB_CONTRACT}::withdraw`,
        run:        withdrawEffect
    },
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
    /**
     * Case_Progression
     */
    {
        actionType: `${process.env.ARB_CONTRACT}::respond`,
        run:        respondEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::addarbs`,
        run:        addArbsEffect
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
        actionType: `${process.env.ARB_CONTRACT}::setruling`,
        run:        setRulingEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::recuse`,
        run:        recuseEffect
    },
    // {
    //     actionType: `${process.env.ARB_CONTRACT}::newjoinder`,
    //     run:        newJoinderEffect
    // },
    // {
    //     actionType: `${process.env.ARB_CONTRACT}::joincases`,
    //     run:        joinCasesEffect
    // },
    /**
     * Arb_Actions
     */
    {
        actionType: `${process.env.ARB_CONTRACT}::newarbstatus`,
        run:        newArbStatusEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::setlangcodes`,
        run:        setLangCodesEffect
    },
    {
        actionType: `${process.env.ARB_CONTRACT}::deletecase`,
        run:        deleteCaseEffect
    }
];