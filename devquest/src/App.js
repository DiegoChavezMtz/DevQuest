import './App.css';
import './assets/style/mainStyle.css';
import { Routes, Route } from 'react-router-dom';
import { Notification } from './Components/Notification';
// Providers
import { NotificationProvider } from './Context/NotificationProvider';
import { PlayerProvider } from './Context/PlayerProvider';
import { SpellProvider } from './Context/SpellProvider';
import { CraftingTableProvider } from './Context/CraftingTableProvider';
import { MainItemsProvider } from './Context/MainItemsProvider';
import { BranchProvider } from './Context/BranchProvider';
// Pages
import { Home } from './Pages/Home';
import { Level2 } from './Pages/Level2';
import { Level3 } from './Pages/Level3';

function App() {
  return (
    <NotificationProvider>
      <PlayerProvider>
        <SpellProvider>
          <CraftingTableProvider>
            <MainItemsProvider>
              <BranchProvider>
              <Notification />
              <Routes>
                <Route path="/"        element={<Home />} />
                <Route path="/level/2" element={<Level2 />} />
                <Route path="/level/3" element={<Level3 />} />
              </Routes>
              </BranchProvider>
            </MainItemsProvider>
          </CraftingTableProvider>
        </SpellProvider>
      </PlayerProvider>
    </NotificationProvider>
  );
}

export default App;
