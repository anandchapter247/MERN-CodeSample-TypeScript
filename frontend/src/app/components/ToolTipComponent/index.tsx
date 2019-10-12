import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';

export interface ITooltipProps {
  dataPlacement: string;
  message: string;
  children?: JSX.Element[] | JSX.Element;
}

const TooltipComponent: React.FC<ITooltipProps> = props => {
  const dataPlacement = props.dataPlacement ? props.dataPlacement : 'top';
  return (
    <OverlayTrigger
      key={dataPlacement || 'top'}
      placement={'top'}
      overlay={<Tooltip id={`tooltip`}>{props.message}</Tooltip>}
    >
      {props.children}
    </OverlayTrigger>
  );
};

export default TooltipComponent;
