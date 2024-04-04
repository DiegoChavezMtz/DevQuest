import './App.css';
import { Console } from './Interface/Console';
import { Screen } from './Screen/Screen';
import { Spellbook } from './Interface/Spellbook';
import { CraftingTable } from './Interface/CraftingTable';
import { MainItem } from './Interface/MainItem';
//Providers
import { PlayerProvider } from './Context/PlayerProvider';
import { SpellProvider } from './Context/SpellProvider';
import { CraftingTableProvider } from './Context/CraftingTableProvider';

function App() {
  return (
    <div className="App">
      <PlayerProvider>
        <SpellProvider>
          <CraftingTableProvider>
            <Screen/>
            <CraftingTable/>
            <MainItem/>
            <Spellbook/>
            <Console/>
          </CraftingTableProvider>
        </SpellProvider>
      </PlayerProvider>
    </div>
  );
}

export default App;
