export const updateTransfers = async (prevState, updatedTransfer) => {

    let isDuplicate = false;
    
    let updatedTransfers = prevState.transfers.map(transfer => {
        if ((transfer.trxHash === updatedTransfer.trxHash) && (transfer.blockHash === updatedTransfer.blockHash)) {
            isDuplicate = true;
            return;
        }
        return transfer;
    });

    if (!isDuplicate) {
        updatedTransfers = [{ ...updatedTransfer }, ...updatedTransfers ];
    }

    return updatedTransfers;
};