import React, { useEffect,useState,useRef} from 'react';
import requestData from '../dataset/requestData.json';
import PieChart, {
    Legend,
    Export,
    Series,
    Label,
    Font,
    Connector,
  } from 'devextreme-react/pie-chart';

const DistrictRequest=()=>{
    let uniqueStates=new Set();
    let uniqueDistricts=new Set();
    useEffect(() => {
        requestData.data.forEach(data => {
        let _district=data.district;
        let _state=data.state;
        uniqueStates.add(_state);
        uniqueDistricts.add(_district);
        });
        // setKeys(uniqueDistricts);
        // console.log({uniqueDistricts,uniqueStates})
    }, )
    

    
    

    const [dataSource,setdataSource]=useState();
    const [chartTitle,setTitle]=useState();
    const [targetregion,setTargetregion]=useState("district");
    const [targetKey,setTargetkey]=useState("Shravasti");
    const [keys,setKeys]=useState([]);
    
    useEffect(() => {
        setdataSource(fetchPieData(targetKey,targetregion));
    }, [targetKey,targetregion])
    
    

    const fetchPieData=(key,choice)=>{
        let [districtData,stateData]=groupData();
        let result;
        // console.log(choice)
        switch(choice)
        {
            case "district":
                {
                    result=getSpecificDataSource(key,clusterrequestTypes(districtData));
                    setKeys(Array.from(uniqueDistricts));
                    break;
                }
            case "state":
                {
                    result=getSpecificDataSource(key,clusterrequestTypes(stateData));
                    setKeys(Array.from(uniqueStates));
                    break;
                }
            default :break;

        }
        // console.log(result)
        return result;
    }

    const getSpecificDataSource=(key,dataset)=>{
        let datatoReturn=[]
        console.log(key,dataset)
        for(let entry in dataset[key])
        {
            
            datatoReturn.push(
                {
                    "requestType":entry,
                    "requestCount":dataset[key][entry]
                }
            )
        }

        return datatoReturn;
    }

    const groupData=()=>{
        var districtDictionary={}
        var stateDictionary={}
        requestData.data.forEach(data => {
            let _district=data.district;
            let _state=data.state;
            
            if(_state in stateDictionary)
                stateDictionary[_state].push(
                    {
                        "userID":data.userID,
                        "requestType":data.requestType
                    }
                );
            else
                stateDictionary[_state]=[
                    {
                        "userID":data.userID,
                        "requestType":data.requestType
                    }
                ];
            
            
            if(_district in districtDictionary)
                districtDictionary[_district].push(
                    {
                    "userID":data.userID,
                    "requestType":data.requestType
                });
            else
                districtDictionary[_district]=[
                    {
                        "userID":data.userID,
                        "requestType":data.requestType
                    }
                ];
            
        
        });

        return [districtDictionary,stateDictionary];
    }

    const clusterrequestTypes=(dataset)=>{
        var clusteredData={}
        for(let key in dataset)
        {
            let keyFrequency={}
            dataset[key].forEach((data)=>{
                let type=data.requestType 
                if(type in keyFrequency)
                {
                    keyFrequency[type]+=1;
                }
                else
                {
                    keyFrequency[type]=1;
                }
                
            })
            clusteredData[key]=keyFrequency;
        }
        return clusteredData;
    }

    function customizeText(arg) {
        return `${arg.valueText} (${arg.percentText})`;
      }
      
    return(
        <>
        <label htmlFor="region">Select region type</label>
        <select id="region" 
        onChange={e=>setTargetregion(e.target.value)}>
            <option value="district">District</option>
            <option value="state">State</option>
        </select>

        <label htmlFor="targetKey">Select region</label>
        <select id="targetKey" 
        onChange={e=>{
            setTargetkey(e.target.value)
        }}
        >
        {
            keys && keys.map((key,id)=><option value={key} id={id}>{key}</option>)
        }
        </select>

       {  dataSource&&
        <PieChart id="pie"
        palette="Bright"
        dataSource={dataSource}
        title={chartTitle}
        >
        <Legend
            orientation="horizontal"
            itemTextPosition="right"
            horizontalAlignment="center"
            verticalAlignment="bottom"
            columnCount={4} />
        <Export enabled={true} />
        <Series argumentField="requestType" valueField="requestCount">
            <Label
            visible={true}
            position="columns"
            customizeText={customizeText}>
            <Font size={16} />
            <Connector visible={true} width={0.5} />
            </Label>
        </Series>
        </PieChart>
        }
        </>
    )

}


export default DistrictRequest;