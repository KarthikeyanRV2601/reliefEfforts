import React, { useEffect,useState,useRef} from 'react';
import '../design/css/newRequest.css'
import requestData from '../dataset/requestData.json';

const NewRequest=()=>{

    const districtRef=useRef(null);
    const stateRef=useRef(null);
    const eventRef=useRef(null);
    const typeRef=useRef(null);
    
    useEffect(() => {
        let uniqueStates=new Set();
        let uniqueDistricts=new Set();
        requestData.data.forEach(data => {
        let _district=data.district;
        let _state=data.state;
        uniqueStates.add(_state);
        uniqueDistricts.add(_district);
        });
        // console.log({uniqueDistricts,uniqueStates})
        setdistrictList(Array.from(uniqueDistricts));
        setstateList(Array.from(uniqueStates));
    }, )

    const handleSubmit=(e)=>{
        e.preventDefault();
        
    }

    const [districtList,setdistrictList]=useState([]);
    const [stateList,setstateList]=useState([]);
    return(
        <body>
        <div class="row">
            <div class="col-md-12">
            <form action="index.html" method="post">
                <h1> Request </h1>
                
                <fieldset>
                
                
                <label for="district">District:</label>
                <select type="text" id="district" name="district"
                ref={districtRef}
                >
                {
                    districtList.map((key,id)=><option value={key} id={id}>{key}</option>)
                }

                </select>
                
                <label for="state">State:</label>
                <select type="text" id="state" name="state"
                ref={stateRef}
                >
                {
                    stateList.map((key,id)=><option value={key} id={id}>{key}</option>)
                }
                </select>
            
                <label for="event">Event:</label>
                <select id="event" name="event"
                ref={eventRef}
                >
                                <option value="Floods"> Floods</option>
                                <option value="Earthquake">Earthquake</option>
                                <option value="Tsunami">Tsunami</option>
                                <option value="Nuclear disaster">Nuclear Disaster</option>
                                <option value="Volcanic Eruption">Volcanic Eruption</option>
                                <option value="Cyclone">Cyclone</option>
                                <option value="Coastal Erosion">Coastal Erosion</option>
                                <option value="Hurricane">Hurricane</option>
                                <option value="Firestorm">Firestorm</option>
                                <option value="Duststorm">Duststorm</option>
                </select>
                <label for="type">Type:</label>
                <select id="type" name="type"
                ref={typeRef}
                >
                            <option value="Medical"> Medical</option>
                            <option value="Food"> Food </option>
                            <option value="Shelter"> Shelter</option>
                            <option value="Education">Education</option>
                            <option value="Unemployment">Unemployment</option>
                            <option value="Water">Water</option>
                </select>
                
                
                </fieldset>
                
                <button type="submit" onClick={e=>handleSubmit(e)}>Submit</button>
                
            </form>
        </div>
      </div>
      
    </body>
    )
}

export default NewRequest;