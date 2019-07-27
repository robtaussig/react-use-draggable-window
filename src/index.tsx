import React, { FC, createContext, Fragment, useCallback, useState, useContext } from 'react';
import DraggableWindow from './DraggableWindow';
import './style.css';

export const DraggableBoundaries: FC<DraggableBoundariesProps> = ({ children }) => {
  const [draggableWindowState, setDraggableWindowState] = useState<DraggableWindowState>(initialDraggableWindowState);

  const closeDraggableWindow = useCallback(() => setDraggableWindowState(initialDraggableWindowState), []);

  const openWindow = useCallback((component: React.Component, options: DraggableWindowOptions = defaultDraggableOptions) => {
    setDraggableWindowState(prev => ({
      ...prev,
      component,
      options,
      open: true,
    }));

    return closeDraggableWindow;
  }, []);

  return (
    <DraggableWindowContext.Provider value={openWindow}>
      <Fragment>
        {children}
        <DraggableWindow close={closeDraggableWindow} state={draggableWindowState}/>
      </Fragment>
    </DraggableWindowContext.Provider>
  );
};

export const useDraggableWindow = () => useContext(DraggableWindowContext);

export interface DraggableBoundariesProps {
  children: any
}

export interface DraggableWindowState {
  open: boolean,
  component: React.Component,
  options: DraggableWindowOptions,
}

export interface DraggableWindowOptions {
  menuItems?: MenuItem[],
  wrapperClassName?: string,
  displacedOptions: object,
}

export interface MenuItem {
  label: string,
  onClick: () => void,
  className?: string,
}

const DraggableWindowContext = createContext(null);

const defaultDraggableOptions: DraggableWindowOptions = {
  menuItems: [],
  wrapperClassName: 'draggable-window',
  displacedOptions: {},
};

const initialDraggableWindowState: DraggableWindowState = {
  open: false,
  component: null,
  options: defaultDraggableOptions,
};

export default useDraggableWindow;
