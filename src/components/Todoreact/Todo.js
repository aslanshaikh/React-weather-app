import React, { useState, useEffect } from 'react';
import "./Style.css";

const getLocalData = () => {
    const lists = localStorage.getItem("mytodoList");
    if(lists) {
        return JSON.parse(lists);
    }
    else {
        return[];
    }
}

const Todo = () => {
    const [inputdata, setInputdata] = useState(" "); 
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // add the items 
    const addItem = () => {
        if(!inputdata){
            alert("pls fill the data");
        }
        else if(inputdata && toggleButton ) {
            setItems(
                items.map((curElem) => {
                    if(curElem.id === isEditItem) {
                        return {...curElem, name: inputdata};
                    }
                    return curElem;
                })
            );
        setInputdata([]);
        setEditItem(null);
        setToggleButton(false);
        }
        else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            };
            setItems([...items, myNewInputData]);
            setInputdata("");
        }
    };

    //update the items function 
    const editItem = (index) => {
        const item_todo_edit = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputdata(item_todo_edit.name);
        setEditItem(index);
        setToggleButton(true);
    }

    //delete item function 
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id != index;
        })
        setItems(updatedItems);
    };

    const removeAll = () => {
        setItems([]);
    };

    //adding localstorage
    useEffect(() => {
      localStorage.setItem("mytodoList", JSON.stringify(items))
    }, [items])
    


    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                <figure>
                    <img src="./logo192.png" alt="todologo" />
                    <figcaption>Add Your List Here </figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder='Add Item' className='form-control' value={inputdata } onChange={(event) => setInputdata(event.target.value)} />
                    {toggleButton ? (<i className='far fa-edit add-btn' onClick={addItem}></i>) : (<i className='fa fa-plus add-btn' onClick={addItem}></i>)}
                    
                </div>
                    {/*items show */}
                    <div className="showItems">
                    {
                        items.map((curElem) => {
                            return (
                                <div className="eachItem" key={curElem.id}>
                                <h3>{ curElem.name }</h3>
                                <div className="todo-btn">
                                <i className='far fa-edit add-btn' onClick={() => editItem(curElem.id)}></i>
                                <i className='far fa-trash-alt add-btn' onClick={() => deleteItem(curElem.id)}></i>
                                </div>
                                
                                </div>

                            )
                        } )
                    }
                        
                    </div>

                <div className="showItems">
                    <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                    <span>Check List</span> </button>    
                </div>
                </div>
            </div>
        </>
    )
}

export default Todo