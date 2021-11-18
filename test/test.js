const User = artifacts.require('./User.sol')

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
      console.log("count: "+count)
      assert.equal(count, 0)
    })
  })

  
})