import React, {useRef} from 'react'
import '../styles.css'
import { Worker, Item } from '../models/model';
import  CustomDropDownList from './CustomDropDownList'
import { CustomWebcam } from './CustomWebcam';


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

    const make_request = async (url: string): Promise<void> => {
        if (!url) {
            alert('Please upload an image first.');
            return;
        }


        try {
            const apiResponse = await fetch('http://localhost:3000/process-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl: url }),
            });
            // const apiResponse = {IMEI: '358184148392384', MODEL: 'IPHONE 13 256GB'}
            // const data = apiResponse
            if (!apiResponse.ok) {
                const errorBody = await apiResponse.json();
                console.error('Error details:', errorBody);
                throw new Error(`HTTP error! status: ${apiResponse.status}`);
              }

            const data = await apiResponse.json();
            console.log('Response from API:', data);


            // Update state with API response data
            setItem({
                ...item,
                imei: data.extractedData.IMEI,
                model: data.extractedData.MODEL,
            });

        } catch (error) {
            console.error('Error:', (error as Error).message);
            // Handle error state or display error message
        }
    };

    return (
        <>
            <CustomWebcam make_request={make_request}/>
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
    </>
    )
}

export default InputField