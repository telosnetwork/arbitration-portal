async function setLangCodesHandler (state, payload, blockInfo, context) {
    try {
        console.log('SetLangCodes updater PAYLOAD:   ', payload);
        console.log('SetLangcodes updater BlockInfo: ', blockInfo);

        let arbitrator = payload.data.arbitrator;
        
        // Lang_Codes
        let lang_codes = payload.data.lang_codes;

        await state.arbitrator.findOneAndUpdate({ arb: arbitrator }, {
            languages: lang_codes
        }, { upsert: true }).exec();
    } catch (err) {
        console.error('SetLangCodes updater error: ', err);
    }
}

export default setLangCodesHandler;