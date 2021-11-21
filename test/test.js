const User = artifacts.require('./User.sol')
const Transaction =artifacts.require('./Transaction.sol')
const RequestDataset=artifacts.require('./RequestDataset.sol')
require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('User', ([deployer, author]) => {
  let usercontract

  before(async () => {
    usercontract = await User.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await usercontract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has zero initial users', async () => {
      const count = await usercontract.userCount()
      assert.equal(count, 0)
    })

    it('can add new user entry', async () => {
      var _userName="username";
      var _encryptedPassword="xzjs1X21232Zsdxlasd01";
      await usercontract.addnewUser(_userName,_encryptedPassword);
      const count = await usercontract.userCount();
      assert.equal(count, 1)
    })
  })

  
})

contract('Transaction', (accounts) => {
  let transactionContract

  before(async () => {
    transactionContract = await Transaction.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await transactionContract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has zero initial transactions', async () => {
      const count = await transactionContract.transactionCount()
      assert.equal(count, 0)
    })
    it('New transactions can be added',async ()=>{
      const receiver='0xE8535E9a64BF573AF41Ede76321854b02D16f6D4';
      const sender=accounts[0];
      const date = new Date().toISOString();
      const senderName="sender1";
      const amount='0x1936c240636390dc823e3a728e94b208eb53c6756d81da57ec3425e05d43ac10';
      await transactionContract.addNewTransactionEntry(senderName,date,receiver,amount,{ from: sender });

      const count = await transactionContract.transactionCount()
      assert.equal(count, 1)
      

    })
  })

  
})



contract('RequestDataset', ([deployer, author]) => {
  let requestDatasetContract

  before(async () => {
    requestDatasetContract = await RequestDataset.deployed()
  })

  describe('deployment', async () => {


    
    it('deploys successfully', async () => {
      const address = await requestDatasetContract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })


    it('can update dataset', async () => {
      var _hash="90c707e6f22400865af382b3065c91bc";
      var _timestamp="12-01-2021";
      await requestDatasetContract.updateDataset(_hash,_timestamp);
      assert.equal(1,1)
    })

    it('can get last updated date', async () => {
      
      var lastupdate=await requestDatasetContract.getLastUpdateTime();
      assert.equal(lastupdate,"12-01-2021")
      
    })

     it('can get current IPFS Hash of the dataset', async () => {

      var hash=await requestDatasetContract.getDatasetHash();
      assert.equal(hash,"90c707e6f22400865af382b3065c91bc")
    })

     it('get total changes count', async () => {

      var count=await requestDatasetContract.updateIter();
      assert.equal(count.toNumber(),1)
    })

      it('get entry from history by index', async () => {

      var record=await requestDatasetContract.history(0);
      assert.equal((record.IPFSHash=='90c707e6f22400865af382b3065c91bc')&&(record.lastUpdated=="12-01-2021"),true);
      
    })


  })

  
})
