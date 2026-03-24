import React, { useState, useEffect, useContext } from 'react';

const branchContext = React.createContext();

export const useBranchContext = () => {
    const context = useContext(branchContext);
    if (!context) throw new Error('useBranchContext must be used within BranchProvider');
    return context;
};

const initialBranchState = {
    currentBranch: 'main',
    branches: { main: { item: null } },
    pendingMerge: null,   // { sourceBranch, result } | null
};

export const BranchProvider = ({ children }) => {
    const [state, setState] = useState(() => {
        const saved = localStorage.getItem('devquest_branches');
        return saved ? JSON.parse(saved) : initialBranchState;
    });

    useEffect(() => {
        localStorage.setItem('devquest_branches', JSON.stringify(state));
    }, [state]);

    const setCurrentBranch = (name) =>
        setState(prev => ({ ...prev, currentBranch: name }));

    const setBranches = (fn) =>
        setState(prev => ({
            ...prev,
            branches: typeof fn === 'function' ? fn(prev.branches) : fn,
        }));

    const setPendingMerge = (merge) =>
        setState(prev => ({ ...prev, pendingMerge: merge }));

    const resetBranches = () => setState(initialBranchState);

    const value = {
        currentBranch: state.currentBranch,
        branches: state.branches,
        pendingMerge: state.pendingMerge,
        setCurrentBranch,
        setBranches,
        setPendingMerge,
        resetBranches,
        initialBranchState,
    };

    return (
        <branchContext.Provider value={value}>
            {children}
        </branchContext.Provider>
    );
};
