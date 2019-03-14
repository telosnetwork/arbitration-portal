/**
 * List all cases status types used in the application
 */

export default {

  0: 'CASE_SETUP',
  1: 'AWAITING_ARBS',
  2: 'CASE_INVESTIGATION',
  3: 'HEARING',
  4: 'DELIBERATION',
  5: 'DECISION',   // 5 NOTE: No more joinders allowed
  6: 'ENFORCEMENT',
  7: 'RESOLVED',
  8: 'DISMISSED', // 8 NOTE: Dismissed cases advance and stop here

};
