pragma solidity ^0.5.0;


contract Transaction{
    uint public transactionCount=0;

    struct transaction{
        string senderName;
        address senderAddress;
        address receiver;
        uint256 amount;
        string timestamp;
    }

    event newTransaction(
        string senderName,
        address senderAddress,
        address receiver,
        uint256 amount,
        string timestamp
    );

    mapping(uint=>transaction) public transactions;

    function addNewTransactionEntry(string memory _senderName,string memory _timeStamp,address _receiver,uint256 _amount) public payable
    {
        require(msg.sender!=address(0));
        transactionCount++;
        address receiverDerived=_receiver!=address(0)?_receiver:address(0);
        transactions[transactionCount]=transaction(_senderName,msg.sender,receiverDerived,_amount,_timeStamp);
        emit newTransaction(_senderName,msg.sender,receiverDerived,_amount,_timeStamp);
    }

    
}