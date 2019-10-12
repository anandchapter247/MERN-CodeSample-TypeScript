import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { ITooltipProps } from '.';

const InformationTooltip: React.FC<ITooltipProps> = props => {
  const dataPlacement = props.dataPlacement ? props.dataPlacement : 'top';
  return (
    <OverlayTrigger
      key={dataPlacement || 'top'}
      placement={'top'}
      overlay={<Tooltip id={`tooltip`}>{props.message}</Tooltip>}
    >
      <span className='tooltip-icon'>
        <i className='icon-info' />
      </span>
    </OverlayTrigger>
  );
};

export default InformationTooltip;
