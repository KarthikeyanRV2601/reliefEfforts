const User = artifacts.require("User");
const Transaction=artifacts.require("Transaction");

module.exports = function(deployer) {
  deployer.deploy(User);
  deployer.deploy(Transaction);
};
