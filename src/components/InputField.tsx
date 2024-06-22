import React, {useRef} from 'react'
import '../styles.css'
import { Worker, Item } from '../models/model';
import  CustomDropDownList from './CustomDropDownList'

interface Props {
    item: Item,
    setItem: React.Dispatch<React.SetStateAction<Item>>,
    handleAdd: (e: React.FormEvent) => void,
    handleWorkerSelect: (worker: Worker) => void,
}

const workers: Worker[] = [
    { id: 1, name: "Alice Johnson", abreviation: "aj" },
    { id: 2, name: "Bob Smith", abreviation: "bs" },
    { id: 3, name: "Charlie Davis", abreviation: "cd" },
    { id: 4, name: "David Lee", abreviation: "dl" },
    { id: 5, name: "Eva Rodriguez", abreviation: "eva" }
];

const InputField: React.FC<Props> = ({ item, setItem, handleAdd, handleWorkerSelect }: Props) => {

    const imeiInputRef = useRef<HTMLInputElement>(null)
    const modelInutRef = useRef<HTMLInputElement>(null)

    return (
        <form 
            className='input_form'
            onSubmit={(e) => {
                handleAdd(e);
                // imeiInputRef.current?.blur();
                // modelInutRef.current?.blur()
                // imeiInputRef.current?.focus();
            }}
        >
            <CustomDropDownList workers={workers} handleWorkerSelect={handleWorkerSelect}/>
            <input 
                ref={modelInutRef}
                type="text" 
                placeholder='Model' 
                className="input_box"
                onChange={(e) => setItem(prevItem => ({...prevItem, model: e.target.value}))}
                value={item.model}
            />
            <input
                ref={imeiInputRef}
                className='input_box'
                type='input'
                placeholder='Imei'
                onChange={(e) => setItem(prevItem => ({...prevItem, imei: e.target.value}))}
                value={item.imei}
            />
            <button className='input_submit' type='submit'>Save</button>
    </form>
    )
}

export default InputField