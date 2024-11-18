import React from 'react';
import NavButton from './NavButton';
import { NavButtonProps } from './NavButton';

type Props = {
  buttons: NavButtonProps[];
};

const ButtonGroup = ({ buttons }: Props) => {
  return (
    <div>
      {buttons.map((item) => {
        return <NavButton href={item.href} btnText={item.btnText} />;
      })}
    </div>
  );
};

export default ButtonGroup;
