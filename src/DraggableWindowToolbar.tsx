import React, { FC } from 'react';
import { MenuItem } from '.';
import { OpenState } from './DraggableWindow';

export const DraggableWindowToolbar: FC<DraggableWindowToolbarProps> = ({
  menuItems,
  openState,
  minimize,
  maximize,
  restore,
  close,
}) => {

  const _minimizeButton = <button onClick={minimize}>_</button>;
  const _restoreeButton = <button onClick={restore}>-</button>;
  const _maximizeButton = <button onClick={maximize}>^</button>;
  const _closeButton = <button onClick={close}>X</button>;

  return (
    <nav>
      {menuItems.map((menuItem, idx) => {
        return (
          <button key={`${menuItem.label}-${idx}`} onClick={menuItem.onClick}>{menuItem.label}</button>
        );
      })}
      {openState === OpenState.minimized ?
        [_restoreeButton, _maximizeButton] :
        openState === OpenState.maximized ?
          [_minimizeButton, _restoreeButton] :
          [_minimizeButton, _maximizeButton]
      }
      {_closeButton}
    </nav>
  );
};

interface DraggableWindowToolbarProps {
  menuItems?: MenuItem[],
  openState: OpenState,
  minimize: () => void,
  maximize: () => void,
  restore: () => void,
  close: () => void,
}

export default DraggableWindowToolbar;
