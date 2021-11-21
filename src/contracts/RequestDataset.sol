pragma solidity ^0.5.0;

contract RequestDataset {
  uint public updateIter=0;
  struct DatasetStructure{
    string IPFSHash;
    string lastUpdated;
    
  }

  event datasetUpdation(
    string IPFSHash,
    string lastUpdated
    
  );  

  DatasetStructure private dataset;  
  mapping(uint=>DatasetStructure) public history;

  function updateDataset(string memory _IPFSHash,string memory _timestamp) public
  {
    
    require(bytes(_IPFSHash).length>0  && bytes(_timestamp).length>0 && msg.sender!=address(0));
    dataset=DatasetStructure(_IPFSHash,_timestamp);
    history[updateIter]=DatasetStructure(_IPFSHash,_timestamp);
    updateIter++;
    emit datasetUpdation(_IPFSHash,_timestamp);
    
  }
  


  function getLastUpdateTime() public view returns(string memory)
  {
    return dataset.lastUpdated;
  }
  function getDatasetHash() public view returns(string memory)
  {
      return dataset.IPFSHash;
  }
  
}
