import React from 'react'
import { MainItem } from '../Interface/MainItem'
import { CraftingTable } from '../Interface/CraftingTable'
import { Screen } from '../Screen/Screen'
import { Spellbook } from '../Interface/Spellbook'
import { Console } from '../Interface/Console'
import { ResetButton } from '../Components/ResetButton'

export const Level3 = () => {
    return (
        <div className='App'>
            <MainItem />
            <CraftingTable />
            <Screen />
            <Spellbook />
            <Console />
            <ResetButton />
        </div>
    );
};
