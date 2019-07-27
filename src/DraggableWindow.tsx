import React, { FC, useState, useCallback, useEffect, useRef } from 'react';
import { DraggableWindowState } from './';
import DraggableWindowToolbar from './DraggableWindowToolbar';
import displace from 'displacejs';

export const DraggableWindow: FC<DraggableWindowProps> = ({ close, state }) => {
  const [openState, setOpenState] = useState<OpenState>(OpenState.restored);
  const windowRef = useRef(null);
  
  const handleMinimize = useCallback(() => setOpenState(OpenState.minimized),[]);
  const handleMaximize = useCallback(() => setOpenState(OpenState.maximized),[]);
  const handleRestore = useCallback(() => setOpenState(OpenState.restored),[]);
  const getToolbarRef = useCallback(ref => {
    const options = {
        handle: ref,
    };
    displace(windowRef.current, options);
  }, []);

  if (state.open === false) return null;
  if (!state.component) throw new Error ('DraggableWindow is set to open, but was not provided a component');

  return (
    <div id='draggable-window' ref={windowRef} className={state.options.wrapperClassName}>
      <DraggableWindowToolbar
        getToolbarRef={getToolbarRef}
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
