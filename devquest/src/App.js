import './App.css';
import { Console } from './Interface/Console';
import { Screen } from './Screen/Screen';
import { Spellbook } from './Interface/Spellbook';
import { CraftingTable } from './Interface/CraftingTable';
import { MainItem } from './Interface/MainItem';
//Providers
import { PlayerProvider } from './Context/PlayerProvider';
import { SpellProvider } from './Context/SpellProvider';

function App() {
  return (
    <div className="App">
      <PlayerProvider>
        <SpellProvider>
          <Screen/>
          <CraftingTable/>
          <MainItem/>
          <Spellbook/>
          <Console/>
        </SpellProvider>
      </PlayerProvider>
    </div>
  );
}

export default App;
