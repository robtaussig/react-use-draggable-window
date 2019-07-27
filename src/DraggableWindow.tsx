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

  const getToolbarRef = useCallback(getRefPromise(toolbarPromise), []);
  const getWindowRef =  useCallback(getRefPromise(draggableWindowPromise), []);

  useEffect(() => {
    const getDraggableWindow = resolveRefPromise(draggableWindowPromise);
    const getToolbar = resolveRefPromise(toolbarPromise);
  
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
    <div id='draggable-window' ref={getWindowRef} className={state.options.wrapperClassName} style={styleFromOpenState(openState)}>
      <DraggableWindowToolbar
        getToolbarRef={getToolbarRef}
        menuItems={state.options.menuItems}
        openState={openState}
        minimize={handleMinimize}
        maximize={handleMaximize}
        restore={handleRestore}
        close={close}
      />
      {openState !== OpenState.minimized && state.component}
    </div>
  );
};

const getRefPromise = (refPromise: any) => (ref: any) => {
  if (refPromise.current === null) {
    refPromise.current = ref;
  } else if (typeof refPromise.current === 'function') {
    refPromise.current(ref);
  }
};

const resolveRefPromise = (refPromise: any) => async () => new Promise(resolve => {
  if (refPromise.current === null) {
    refPromise.current = resolve;
  } else {
    resolve(refPromise.current);
  }
});

export interface DraggableWindowProps {
  close: () => void,
  state: DraggableWindowState,
}

export enum OpenState {
  minimized = 1,
  maximized = 2,
  restored = 3,
}

const styleFromOpenState = (openState: OpenState) => {
  switch (openState) {
    case OpenState.minimized:
      return {
        minHeight: 'unset',
        borderBottom: 'none',
      }
    case OpenState.maximized:
      return {
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
      }
    default:
      return {
        
      };
  }
};

export default DraggableWindow;
