import React from 'react'
import { Item } from '../models/model'
import InputCard from './InputCard'

interface Props {
    items: Item[],
    setItems: React.Dispatch<React.SetStateAction<Item[]>>,
}

const InputList:React.FC<Props> = ({items, setItems}: Props) => {
  return (
    <div className='items'>
        {items.map((item) => (
            <InputCard 
                key={item.id}
                items={items} 
                setItems={setItems}
                item={item}
            />
        ))}
    </div>
  )
}

export default InputList