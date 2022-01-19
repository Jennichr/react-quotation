import { useState } from "react";

function NameList() {
    const names = ["Fin", "Jake", "Marceline"];
    const [listOfNames,setListOfNames] = useState("")
    var currentName = ""
    const optionList = [
        (<option>Fin</option>),
        (<option>Jake</option>),
        (<option>Marceline</option>)
    ]
    const optionList2 = names.map((e) => {
        return (<option>{e}</option>)
    })
    const addName = () => {
        alert("Hi " + currentName)
        setListOfNames(listOfNames + " " + currentName)
    }
    const handleNameChange = (e) => {
        console.log(e.target.value)
        currentName = e.target.value
    }

    return (
        <>
            <select>{optionList2}</select>
            <input type="text" onChange={handleNameChange}/>
            <button onClick={addName}>Add</button>
            <p>{listOfNames}</p>
        </>
    )
}

export default NameList;