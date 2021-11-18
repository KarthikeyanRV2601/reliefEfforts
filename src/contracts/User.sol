pragma solidity ^0.5.0;

contract User {
  uint public userCount = 0;

  struct userStructure{
    uint signupID;
    string user_name;
    string password_encrypted;
    address payable user_address;
  }

  event userAddition(
    uint user_id,
    string user_name,
    string password_encrypted,
    address payable user_address
  );  

  mapping(uint=>userStructure) public users;
  
  function addnewUser(string memory _userName,string memory _passwordEncrypted) public
  {
    require(bytes(_userName).length>0  && bytes(_passwordEncrypted).length>0 && msg.sender!=address(0));
    userCount++;
    users[userCount]=userStructure(userCount,_userName,_passwordEncrypted,msg.sender);
    emit userAddition(userCount,_userName,_passwordEncrypted,msg.sender);
  }
  
 
}
