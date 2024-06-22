import React, { useEffect, useRef, useState } from 'react'
import { Item } from '../models/model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import '../styles.css'

interface InputCardProps {
  items: Item[],
  item: Item,
  setItems: React.Dispatch<React.SetStateAction<Item[]>>,
}

const InputCard:React.FC<InputCardProps> = ({items, item, setItems}: InputCardProps) => {

  // TODO: States must be managed by one parent node. Move states up.

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editActionValue, setEditActionValue] = useState<string>(item.id);

  const inputRef = useRef<HTMLInputElement>(null)

  const handleInventoryButton = (id: string): void => {
    setItems(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, inInventory: !item.inInventory } : item
    ));
  };

  const handleDeleteButton = (id: string): void => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEditButton = (): void => {
    if (!editMode && item.inInventory) {
      setEditMode(!editMode);
    }
  }

  const handleEditSubmit = (e:React.FormEvent, id: string): void => {
    e.preventDefault();
    setItems(prevItems => prevItems.map(currentItem => 
      currentItem.id === id ? { ...currentItem, imei: editActionValue } : item
    ));
    setEditMode(false)
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [editMode])
  

  return (
    <form className='item_single' onSubmit={(e) => handleEditSubmit(e, item.id)}>
      {editMode ?
        <input 
          ref={inputRef}
          className='item_single--text'
          value={editActionValue} 
          onChange={(e) => setEditActionValue(e.target.value)}
        />
      :
        <div className='item_single_fields'>
          <span className={item.inInventory ? 'item_single--text' : 'item_single--text--strikethrough'}>{item.worker_name}</span>
          <span className={item.inInventory ? 'item_single--text' : 'item_single--text--strikethrough'}>{item.imei}</span>
          <span className={item.inInventory ? 'item_single--text' : 'item_single--text--strikethrough'}>{item.model}</span>
        </div>
      }
        <div>
          <span className='icon' onClick={handleEditButton}>
            <AiFillEdit />
          </span>
          <span className='icon' onClick={() => handleDeleteButton(item.id)}>
            <AiFillDelete />
          </span>
          <span className='icon' onClick={() => handleInventoryButton(item.id)}>
            <MdDone />
          </span>
          
        </div>
    </form>
  )
}

export default InputCard