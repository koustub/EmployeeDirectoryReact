import React, {useState} from 'react';

function Display() {
    const containerStyle = {
        textAlign:'center',
        color:'White'
    }
    const card={
        color:'navy'
    }
    const li={
        color:'navy',
        textAlign:'left',
        width:'400px',
        height:'50px',
        fontSize:'20px',
        left:'380px',
        margin:'1px'
    }
    const title={
        backgroundColor:"navy",
        height:'90px',
        padding:'10px 10px'
    }
    const form = {
        inpt:{
            width:'400px',
            height:'50px',
            fontSize:'20px'
        },
        btn:{
            width:"200px",
            height:'50px'
        }
    }
    const messageI ={
        textAlign:'center'
    }
    const [input, setInput] = useState('');
    const [namesList,setnamesList] = useState([]);
    const [message, setMessage] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [displayUserName, setDisplayUserName] = useState('');
    const [displayPhone, setDisplayPhone] = useState('');
    const [displayEmail, setDisplayEmail] = useState('');
    const [cardStyle,setCardStyle] = useState(
        {
            textAlign:'Left',
           // outline: '1px solid black',
            width:'500px',
            height:'auto',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:'10px',
            padding:'10px',
            backgroundColor:"white"
        }
    );
    
    async function handleChange(e) {
        const input = e.target.value;
        const userInfo = await fetch('https://jsonplaceholder.typicode.com/users');
        let json = await userInfo.json();
        console.log('[Object Received]', json);
        if(input.length>=1 && input.length <=2){
        json.forEach(function(item){
            namesList.push(item.name);
        });}
        console.log(namesList);
        if(input.length>1){
            const newList = namesList.filter( name=>name.indexOf(input)===0);
            setInput(input)
            setnamesList(newList)
            console.log(`[new list received]`,newList);
        }else{
            setInput(input);
            setnamesList( [] );
        }

    }

    async function displayInput() {
        setnamesList([]);
        console.log('[input Received]', input);
        const userInfo = await fetch('https://jsonplaceholder.typicode.com/users');
        let json = await userInfo.json();
        console.log('[Object Received]', json);
        const index = json.findIndex(obj => obj.name === `${input}`);
        console.log(`[Object Received]`, json[index]);
        console.log('[Name List]',namesList);
        if (index >= 0) {
            const obj = {
                textAlign:'Left',
            outline: '1px solid black',
            width:'500px',
            height:'auto',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:'10px',
            padding:'10px',
            backgroundColor:"navy"
            };
            setCardStyle(obj)
            setMessage('INFORMATION RECEIVED');
            setDisplayName(`Name :${json[index].name}`);
            setDisplayUserName(`Username :${json[index].username}`);
            setDisplayPhone(`Phone   :${json[index].phone}`);
            setDisplayEmail(`Email   :${json[index].email}`);
            setInput('');
        }
        else {
            const obj = {
                textAlign:'Left',
            outline: '1px solid black',
            width:'500px',
            height:'auto',
            marginRight:'auto',
            marginLeft:'auto',
            marginTop:'10px',
            padding:'10px',
            backgroundColor:"navy"
            };
            setCardStyle(obj)
            setMessage('Sorry There is No User By this Name');
            setDisplayName('');
            setDisplayUserName('');
            setDisplayPhone('');
            setDisplayEmail('');
            setInput('');
        }
    };


    return (
        <div style={containerStyle}>
            <h1 style={title}>User Information</h1>
            <div>
            <input style={form.inpt} onChange={handleChange} placeholder='Enter Input' value={input} type='text' />
            <button style={form.btn} type='button' onClick={displayInput}>search</button>
            </div>
            <ul>{ namesList.map( name =><li style={li} class="list-group-item" onClick={()=>setInput(name)}>{name}</li>)}</ul>
            <div style={cardStyle}>
                <h2 style={messageI}>{message}</h2><br />
                <h2>{displayName}</h2>
                <h2>{displayUserName}</h2>
                <h2>{displayPhone}</h2>
                <h2>{displayEmail}</h2>
            </div>
        </div>
    );
}

export default Display;