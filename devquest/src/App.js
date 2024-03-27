import './App.css';
import { Console } from './Interface/Console';
import { Bag } from './Interface/Bag';
import { Screen } from './Screen/Screen';
import { Spellbook } from './Interface/Spellbook';

function App() {
  return (
    <div className="App">
      <Screen/>
      <Bag/>
      <Spellbook/>
      <Console/>
    </div>
  );
}

export default App;
