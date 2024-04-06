import './App.css';
import './assets/style/mainStyle.css'
import { Console } from './Interface/Console';
import { Screen } from './Screen/Screen';
import { Spellbook } from './Interface/Spellbook';
import { CraftingTable } from './Interface/CraftingTable';
import { MainItem } from './Interface/MainItem';
//Providers
import { PlayerProvider } from './Context/PlayerProvider';
import { SpellProvider } from './Context/SpellProvider';
import { CraftingTableProvider } from './Context/CraftingTableProvider';
import { MainItemsProvider } from './Context/MainItemsProvider';
function App() {
  return (
    <div className="App">
      <PlayerProvider>
        <SpellProvider>
          <CraftingTableProvider>
            <MainItemsProvider>

              <MainItem/>
              <CraftingTable/>
              <Screen/>
              <Spellbook/>
              <Console/>
            </MainItemsProvider>
          </CraftingTableProvider>
        </SpellProvider>
      </PlayerProvider>
    </div>
  );
}

export default App;
