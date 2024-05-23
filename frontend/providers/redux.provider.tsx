'use client';

import { Provider, useStore } from 'react-redux';
import { store } from '../store/redux';
import { ReactNode } from 'react';

export const ReduxProvider = ({
    children,
}: Readonly<{ children: React.ReactNode }>): ReactNode => {
    return <Provider store={store}>{children}</Provider>;
};
export const useRedux = () => useStore();
