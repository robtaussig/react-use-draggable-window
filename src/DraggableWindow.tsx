import React, { FC, useState, useCallback, useEffect, useRef, DOMElement } from 'react';
import { DraggableWindowState } from './';
import DraggableWindowToolbar from './DraggableWindowToolbar';
import displace from 'displacejs';

export const DraggableWindow: FC<DraggableWindowProps> = ({ close, state }) => {
  const [openState, setOpenState] = useState<OpenState>(OpenState.restored);
  const toolbarPromise = useRef(null);
  const draggableWindowPromise = useRef(null);
  
  const handleMinimize = useCallback(() => setOpenState(OpenState.minimized),[]);
  const handleMaximize = useCallback(() => setOpenState(OpenState.maximized),[]);
  const handleRestore = useCallback(() => setOpenState(OpenState.restored),[]);

  const getToolbarRef = useCallback(ref => {
    if (toolbarPromise.current === null) {
      toolbarPromise.current = ref;
    } else if (typeof toolbarPromise.current === 'function') {
      toolbarPromise.current(ref);
    }
  }, []);

  const getWindowRef =  useCallback(ref => {
    if (draggableWindowPromise.current === null) {
      draggableWindowPromise.current = ref;
    } else if (typeof draggableWindowPromise.current === 'function') {
      draggableWindowPromise.current(ref);
    }
  }, []);

  useEffect(() => {
    const getDraggableWindow = async () => {
      return new Promise(resolve => {
        if (draggableWindowPromise.current === null) {
          draggableWindowPromise.current = resolve;
        } else {
          resolve(draggableWindowPromise.current);
        }
      });
    };

    const getToolbar = async () => {
      return new Promise(resolve => {
        if (toolbarPromise.current === null) {
          toolbarPromise.current = resolve;
        } else {
          resolve(toolbarPromise.current);
        }
      });
    };
  
    const initialize = async () => {
      const draggableWindow = await getDraggableWindow();
      const toolbar = await getToolbar();

      toolbarPromise.current = true;
      draggableWindowPromise.current = true;

      const options = {
        handle: toolbar,
        constrain: true,
      };
      displace(draggableWindow, options);
    };

    initialize();
  }, []);

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
