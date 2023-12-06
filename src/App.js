import './App.css';
import 'reactofy-css-library/styles/buttonIcon.css';
import { faker } from "@faker-js/faker";
import Combobox from './lib/components/Combobox';
function App() {
  const comboAOptions = []; 
  for (let i = 1; i <= 100000; i++) { comboAOptions.push({ value: i, label: faker.person.firstName() + i }); } const onSelectedItem = (item) => { console.log("itemsds", item); };
  return (
    <div className="App">
      
        {/* <p className='container title'> */}
        <Combobox  valueKey={"value"} labelKey={"label"} containerWidth={200}  options={comboAOptions} getSelectedOptions={onSelectedItem} />
  
        
    </div>
  );
}

export default App;
