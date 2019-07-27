import React, { FC, useState, useCallback, useEffect, useRef, DOMElement } from 'react';
import { DraggableWindowState } from './';
import DraggableWindowToolbar from './DraggableWindowToolbar';
import displace from 'displacejs';

export const DraggableWindow: FC<DraggableWindowProps> = ({ close, state }) => {
  const [openState, setOpenState] = useState<OpenState>(OpenState.restored);
  const [toolbar, setToolbar] = useState(null);
  const [draggableWindow, setDraggableWindow] = useState(null);
  
  const handleMinimize = useCallback(() => setOpenState(OpenState.minimized),[]);
  const handleMaximize = useCallback(() => setOpenState(OpenState.maximized),[]);
  const handleRestore = useCallback(() => setOpenState(OpenState.restored),[]);

  const getToolbarRef = useCallback(ref => {
    if (!toolbar) {
      setToolbar(ref);
    }
  }, [toolbar]);

  const getWindowRef =  useCallback(el => {
    if (!draggableWindow) {
      setDraggableWindow(el);
    }
  }, [draggableWindow]);

  useEffect(() => {
    if (toolbar && draggableWindow) {
      const options = {
        handle: toolbar,
        constrain: true,
        ...state.options.displacedOptions,
      };
      const displaced = displace(draggableWindow, options);

      return displaced.destroy;
    }
  }, [toolbar, draggableWindow]);

  return (
    <div id='draggable-window' ref={getWindowRef} className={state.options.wrapperClassName}>
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
