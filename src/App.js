import './App.css';
import React from "react";
import 'reactofy-css-library/styles/buttonIcon.css';
import { faker } from "@faker-js/faker";
import Combobox from './lib/components/Combobox';
import AgGrid from './lib/components/AgGrid';
function App() {
  const comboAOptions = []; 
  for (let i = 1; i <= 100000; i++) { comboAOptions.push({ value: i, label: faker.person.firstName() + i }); } const onSelectedItem = (item) => { console.log("itemsds", item); };
  return (
    <div className="App">
      
        {/* <p className='container title'> */}
        {/* <Combobox multiSelect  valueKey={"value"} labelKey={"label"} containerWidth={200}  options={comboAOptions} getSelectedOptions={onSelectedItem} /> */}
        <br/>
        <Combobox search multiSelect  valueKey={"value"} labelKey={"label"} iconWidth={30} containerWidth={220} containerHeight={200}  options={comboAOptions} getSelectedOptions={onSelectedItem} />
        <br/>
        <AgGrid/>
        
    </div>
  );
}

export default App;
