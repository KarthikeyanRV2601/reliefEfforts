const User = artifacts.require("User");
const Transaction=artifacts.require("Transaction");
const RequestDataset=artifacts.require("RequestDataset");

module.exports = function(deployer) {
  deployer.deploy(User);
  deployer.deploy(Transaction);
  deployer.deploy(RequestDataset);
};
