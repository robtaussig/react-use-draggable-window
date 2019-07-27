import React, { FC, useState, useCallback, useEffect, useRef } from 'react';
import { DraggableWindowState } from './';
import DraggableWindowToolbar from './DraggableWindowToolbar';
import displace from 'displacejs';

export const DraggableWindow: FC<DraggableWindowProps> = ({ close, state }) => {
  const [openState, setOpenState] = useState<OpenState>(OpenState.restored);
  const toolbarRef = useRef(null);
  const displaced = useRef(null);
  
  const handleMinimize = useCallback(() => setOpenState(OpenState.minimized),[]);
  const handleMaximize = useCallback(() => setOpenState(OpenState.maximized),[]);
  const handleRestore = useCallback(() => setOpenState(OpenState.restored),[]);
  const handleClose = useCallback(() => {
    displaced.current.destroy();
    displaced.current = null;
    close();
  }, []);
  const getToolbarRef = useCallback(ref => {
    toolbarRef.current = ref;
  }, []);

  const getWindowRef =  useCallback(el => {
    if (displaced.current === null) {
      const options = {
        handle: toolbarRef.current,
        constrain: true,
        ...state.options.displacedOptions,
      };
      displaced.current = displace(el, options);
    }
  }, [state.options]);

  return (
    <div id='draggable-window' ref={getWindowRef} className={state.options.wrapperClassName} style={{
      display: state.open ? 'flex' : 'hidden',
    }}>
      <DraggableWindowToolbar
        getToolbarRef={getToolbarRef}
        menuItems={state.options.menuItems}
        openState={openState}
        minimize={handleMinimize}
        maximize={handleMaximize}
        restore={handleRestore}
        close={handleClose}
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
