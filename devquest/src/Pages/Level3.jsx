import React from 'react'
import { MainItem } from '../Interface/MainItem'
import { CraftingTable } from '../Interface/CraftingTable'
import { Screen } from '../Screen/Screen'
import { BranchPanel } from '../Interface/BranchPanel'
import { GrimorioConsole } from '../Interface/GrimorioConsole'
import { ResetButton } from '../Components/ResetButton'
import { MergePreview } from '../Interface/MergePreview'

export const Level3 = () => {
    return (
        <div className='App'>
            <MainItem />
            <CraftingTable />
            <BranchPanel />
            <Screen />
            <GrimorioConsole />
            <ResetButton />
            <MergePreview />
        </div>
    );
};
