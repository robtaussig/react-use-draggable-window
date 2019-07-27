import React, { FC, Fragment, DOMElement } from 'react';
import { MenuItem } from '.';
import { OpenState } from './DraggableWindow';

export const DraggableWindowToolbar: FC<DraggableWindowToolbarProps> = ({
  getToolbarRef,
  menuItems,
  openState,
  minimize,
  maximize,
  restore,
  close,
}) => {

  const _minimizeButton = <button onClick={minimize}>_</button>;
  const _restoreButton = <button onClick={restore}>-</button>;
  const _maximizeButton = <button onClick={maximize}>^</button>;
  const _closeButton = <button onClick={close}>X</button>;

  return (
    <nav ref={getToolbarRef} className='draggable-toolbar'>
      {menuItems.map((menuItem, idx) => {
        return (
          <button key={`${menuItem.label}-${idx}`} className={'draggable-menu-item'} onClick={menuItem.onClick}>{menuItem.label}</button>
        );
      })}
      {openState === OpenState.minimized ?
        <Fragment>
          {_restoreButton}
          {_maximizeButton}
        </Fragment>:
        openState === OpenState.maximized ?
          <Fragment>
            {_minimizeButton}
            {_restoreButton}
          </Fragment> :
          <Fragment>
            {_minimizeButton}
            {_maximizeButton}
          </Fragment>
      }
      {_closeButton}
    </nav>
  );
};

interface DraggableWindowToolbarProps {
  getToolbarRef: (ref: any) => void,
  menuItems?: MenuItem[],
  openState: OpenState,
  minimize: () => void,
  maximize: () => void,
  restore: () => void,
  close: () => void,
}

export default DraggableWindowToolbar;
