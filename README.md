# arbitration-portal
React Front-End and Node Server for eosio.arb DApp

## Members
CASE_STATUS = (0) CASE_SETUP
All actions pop out as a modal form to fill out based on the tabs here `http://202.131.88.20:3000/` 
    1. Member to `create case` - button at the top right
    2. Member can `add claim`/ `remove claim`/ `delete case` - action icons in the table
    3. Member to `start case` - action icon in the table -> Open Modal and Transfer 100.0000 TLOS to eosio.arb (the arbitration account)

Leave an action icon for the messaging service disabled.
After this - all actions for the members' case will be disabled!