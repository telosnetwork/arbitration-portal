const contractAddress = process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT;

class ArbitrationContract {
  constructor(eosio) {
    this.eosio = eosio;
  }

  async fileCase(casefileData) {

    const { claimant, claim_link, lang_codes, respondant } = casefileData;

    const actionData = {
      claimant,
      claim_link,
      lang_codes,
      respondant,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'filecase',
      actionData
    );

  }

  async shredCase(shredCaseData) {

    const { case_id, claimant } = shredCaseData;

    const actionData = {
      case_id,
      claimant,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'shredcase',
      actionData
    );

  }

  async readyCase(readyCaseData) {

    const { case_id, claimant } = readyCaseData;

    const actionData = {
      case_id,
      claimant,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'readycase',
      actionData
    );

  }

  async deleteCase(deleteCaseData) {

    const { case_id } = deleteCaseData;

    const actionData = {
      case_id,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'deletecase',
      actionData
    );

  }

  async addClaim(addClaimData) {

    const { case_id, claimant, claim_link } = addClaimData;

    const actionData = {
      case_id,
      claim_link,
      claimant,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'addclaim',
      actionData
    );

  }

  async removeClaim(removeClaimData) {

    const { case_id, claimant, claim_hash } = removeClaimData;

    const actionData = {
      case_id,
      claim_hash,
      claimant,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'removeclaim',
      actionData
    );

  }

  async respondClaim(respondClaimData) {

    const { case_id, claim_hash, respondant, response_link } = respondClaimData;

    const actionData = {
      case_id,
      claim_hash,
      respondant,
      response_link,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'respond',
      actionData
    );

  }

  async getAccountBalance(account_name) {

    // TODO use demux server ?
    const balanceRows = await this.eosio.getTable(contractAddress, 'accounts', account_name, 1);
    const balances = balanceRows.map(balanceRow => this.eosio.constructor.parseBalance(balanceRow.balance));

    const tlosBalance = balances.find(b => b.token === 'TLOS');

    console.log(balanceRows, balances, tlosBalance);

    return tlosBalance || { value: '0.0000', token: 'TLOS' };

  }

  async deposit(account_name) {

    await this.eosio.transfer({
      from: account_name,
      to: contractAddress,
      quantity: '100.0000 TLOS',
      memo: 'Deposit for arbitration',
    });

  }

  async withdraw(account_name, quantity) {

    await this.eosio.transfer({
      from: contractAddress,
      to: account_name,
      quantity,
      memo: 'Withdraw from arbitration',
    });

  }

  async getCases() {

    const rows = await this.eosio.getTable(
      contractAddress,
      'casefiles',
      contractAddress,
      100,
    );
    return rows;

  }
  async getClaims() {

    const rows = await this.eosio.getTable(
      contractAddress,
      'claims',
      contractAddress,
      100,
    );
    return rows;

  }

}

export default ArbitrationContract;
