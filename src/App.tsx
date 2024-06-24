import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Item, Worker } from './models/model';
import InputList from './components/InputList';
import { v4 as uuid } from 'uuid'



const App: React.FC = () => {

  const emptyItem = {
    id: '',
    imei: '',
    model: '',
    inInventory: true,
    worker_name: '',
  }

  const [item, setItem] = useState<Item>(emptyItem);

  const [selectedWorker, setSelectedWorker] = useState<Worker>({
    id: 0,
    name: '',
    abreviation: '',
  });

  const [items, setItems] = useState<Item[]>([]);

  const itemValidation = (item: Item): boolean => {
    console.log({item});
    
    const requiredFields: (keyof Item)[] = ['id', 'imei', 'model', 'worker_name'];
    let isValid = true;
  
    for (const field of requiredFields) {
      if (item[field] === undefined || item[field] === null || item[field] === '') {
        console.log(`Missing or empty required field: ${field}`);
        isValid = false;
      }
    }
  
    if (typeof item.inInventory !== 'boolean') {
      console.log('Missing or invalid inInventory field');
      isValid = false;
    }
  
    // Optional fields check
    // if (item.date_in !== undefined && item.date_in !== null && typeof item.date_in !== 'number') {
    //   console.log('Invalid date_in: must be a number or null/undefined');
    //   isValid = false;
    // }
  
    // if (item.date_out !== undefined && item.date_out !== null && typeof item.date_out !== 'number') {
    //   console.log('Invalid date_out: must be a number or null/undefined');
    //   isValid = false;
    // }
  
    return isValid;
  };
  const handleAdd = (e:React.FormEvent): void => {
    e.preventDefault();
    const newItem: Item = {...item, id: uuid(), date_in: Date.now(), worker_name: selectedWorker.name}
    if(itemValidation(newItem)){

      setItems(prevItems => [...prevItems, newItem]);
      setItem(emptyItem);

      console.log({item, items})
    }
  };

  const handleWorkerSelect = (worker: Worker): void => {
    setSelectedWorker(worker);
  }
  
  return (
      <div className='App'>
        <span className='heading'>Inventory Control</span>
        <InputField item={item} setItem={setItem} handleAdd={handleAdd} handleWorkerSelect={handleWorkerSelect} />
        <InputList items={items} setItems={setItems}/>
      </div>
  );
};

export default App;
