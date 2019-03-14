const contractAddress = process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT;

class ArbitrationContract {
  constructor(eosio) {
    this.eosio = eosio;
  }

  async executeAction({ action, actionData }) {

    await this.eosio.createAndSendAction(
      contractAddress,
      action,
      actionData
    );

  }

  async getAccountBalance(account) {

    // TODO use demux ?
    const balanceRows = await this.eosio.getTable(contractAddress, 'accounts', account.name, 1);
    const balanceString = balanceRows[0] ? balanceRows[0].balance : '0.0000 TLOS';
    const balance = this.eosio.constructor.parseBalance(balanceString);

    return balance;

  }

  async fileCase(casefileData) {

    const { claimant, claim_link, lang_codes, respondant } = casefileData;

    const actionData = {
      claimant,
      claim_link,
      lang_codes,
      respondant,
    };

    await this.executeAction({ action: 'filecase', actionData });

  }

}

export default ArbitrationContract;
