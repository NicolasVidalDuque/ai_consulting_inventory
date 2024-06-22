import React, { useState, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import { Worker } from '../models/model'; // Assuming you have a Worker model
import '../styles.css'

interface CustomDropDownListProps {
  workers: Worker[];
  handleWorkerSelect: (selectedWorker: Worker) => void;
}

const CustomDropDownList: React.FC<CustomDropDownListProps> = ({ workers, handleWorkerSelect}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<Worker[]>(workers);

  useEffect(() => {
    if (inputValue) {
      setFilteredOptions(
        workers.filter(worker =>
          worker.name.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    } else {
      setFilteredOptions(workers);
    }
  }, [inputValue, workers]);

  const handleInputChange = (value: string): void => {
    setInputValue(value);
  };

  const handleChange = (selectedOption: SingleValue<Worker>): void => {
    if (selectedOption) {
      handleWorkerSelect(selectedOption);
    }
  };

  return (
    <Select
      className='custom_select_dropdown'
      options={filteredOptions}
      getOptionLabel={(option: Worker) => option.name}
      getOptionValue={(option: Worker) => option.id.toString()}
      onInputChange={handleInputChange}
      onChange={handleChange}
      placeholder="Select a worker"
    />
  );
};

export default CustomDropDownList;
