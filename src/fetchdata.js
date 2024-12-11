import {useState, useEffect} from 'react';
import './fetchdata.css';
function Show(){
    const [data,setData]=useState([]);
    const [load, setLoading]=useState(true);
    const [err,setErr]=useState("");
    const [display,setDisplay]=useState(false);
    const showData= ()=>{
        setDisplay(!display);
    }
    useEffect(()=>{
        fetch('http://localhost/fecthdata.php')
        .then((response)=>response.json())
        .then((data)=>{
            setData(data);
            setLoading(false);
        })
            .catch((err)=>{
                setErr('Error in fetching data');
                 setLoading(false);
            })
    },[])
    if(load)
    {
        return <h2>Loading</h2>
    }
    if(err)
    {
        return <h2>{err}</h2>
    }
    return (
        <div>
            <button onClick={showData} style={{backgroundColor:'black', color:'white', width:'110px', height:'40px',
             marginLeft:'47%',
                marginTop:'10px',borderRadius:'5px' }}>Show Table</button>
            {display &&
            <div>
            <h2 style={{textAlign:'center'}}>Datas</h2>
            <table border={'3'}>
                <thead>
            <tr>
            <th> Full Name</th>
            <th>Number</th>
            <th>Email</th>
            </tr>
                </thead>
                <tbody>
                    {data.length>0 ? (data.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.fname} {item.lname}</td>
                            
                            <td>{item.number}</td>
                            <td>{item.email}</td>
                            </tr>
                    )

                    ))  :   (
                    <tr>
              <td colSpan="4">No data available</td>
              </tr>)}
                </tbody>
            </table>
        </div>}
        </div>
    )
}
export default Show;
