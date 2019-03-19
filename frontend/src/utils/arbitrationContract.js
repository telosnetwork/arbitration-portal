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

  async acceptClaim(acceptClaimData) {

    const { case_id, assigned_arb, claim_hash, decision_link, decision_class } = acceptClaimData;

    const actionData = {
      case_id,
      assigned_arb,
      claim_hash,
      decision_link,
      decision_class,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'acceptclaim',
      actionData
    );

  }

  async dismissClaim(dismissClaimData) {

    const { case_id, assigned_arb, claim_hash, memo } = dismissClaimData;

    const actionData = {
      case_id,
      assigned_arb,
      claim_hash,
      memo,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'dismissclaim',
      actionData
    );

  }

  async addArbs(addArbsData) {

    const { case_id, assigned_arb, num_arbs_to_assign } = addArbsData;

    const actionData = {
      case_id,
      assigned_arb,
      num_arbs_to_assign,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'addarbs',
      actionData
    );

  }

  async setRuling(setRulingData) {

    const { case_id, assigned_arb, case_ruling } = setRulingData;

    const actionData = {
      case_id,
      assigned_arb,
      case_ruling,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'setruling',
      actionData
    );

  }

  async recuse(recuseData) {

    const { case_id, rationale, assigned_arb } = recuseData;

    const actionData = {
      case_id,
      rationale,
      assigned_arb,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'recuse',
      actionData
    );

  }

  async newArbStatus(data) {

    const { new_status, arbitrator } = data;

    const actionData = {
      new_status,
      arbitrator,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'newarbstatus',
      actionData
    );

  }

  async setLangCodes(data) {

    const { arbitrator, lang_codes } = data;

    const actionData = {
      arbitrator,
      lang_codes,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'setlangcodes',
      actionData
    );

  }

  async advanceCase(data) {

    const { case_id, assigned_arb } = data;

    const actionData = {
      case_id,
      assigned_arb,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'advancecase',
      actionData
    );

  }

  async dismissCase(data) {

    const { case_id, assigned_arb, ruling_link } = data;

    const actionData = {
      case_id,
      assigned_arb,
      ruling_link,
    };

    await this.eosio.createAndSendAction(
      contractAddress,
      'dismisscase',
      actionData
    );

  }


  async getAccountBalance(account_name) {

    // TODO use demux server ?
    const balanceRows = await this.eosio.getTable(contractAddress, 'accounts', account_name, 1);
    const balances = balanceRows.map(balanceRow => this.eosio.constructor.parseBalance(balanceRow.balance));
    const tlosBalance = balances.find(b => b.token === 'TLOS');

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

  async getCases(limit = 100) {

    const rows = await this.eosio.getTable(
      contractAddress,
      'casefiles',
      contractAddress,
      limit,
    );
    return rows;

  }
  async getClaims(limit = 100) {

    const rows = await this.eosio.getTable(
      contractAddress,
      'claims',
      contractAddress,
      limit,
    );
    return rows;

  }

  async getArbitrators(limit = 100) {

    const rows = await this.eosio.getTable(
      contractAddress,
      'arbitrators',
      contractAddress,
      limit,
    );
    return rows;

  }

}

export default ArbitrationContract;
