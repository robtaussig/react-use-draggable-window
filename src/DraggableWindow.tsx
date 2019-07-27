import React, { FC, useState, useCallback } from 'react';
import { DraggableWindowState } from './';
import DraggableWindowToolbar from './DraggableWindowToolbar';

export const DraggableWindow: FC<DraggableWindowProps> = ({ close, state }) => {
  const [openState, setOpenState] = useState<OpenState>(OpenState.restored);
  if (state.open === false) return null;
  if (!state.component) throw new Error ('DraggableWindow is set to open, but was not provided a component');
  
  const handleMinimize = useCallback(() => setOpenState(OpenState.minimized),[]);
  const handleMaximize = useCallback(() => setOpenState(OpenState.maximized),[]);
  const handleRestore = useCallback(() => setOpenState(OpenState.restored),[]);

  return (
    <div id='draggable-window' className={state.options.wrapperClassName}>
      <DraggableWindowToolbar
        menuItems={state.options.menuItems}
        openState={openState}
        minimize={handleMinimize}
        maximize={handleMaximize}
        restore={handleRestore}
        close={close}
      />
      {state.component}
    </div>
  );
};

export interface DraggableWindowProps {
  close: () => void,
  state: DraggableWindowState,
}

export enum OpenState {
  minimized = 1,
  maximized = 2,
  restored = 3,
}

export default DraggableWindow;
