import React from 'react';
import { IMyButtonProps } from '../../interfaces/Input.interface';

export default class MyButton extends React.Component<IMyButtonProps> {
  render() {
    const { children, className, ...props } = this.props;
    console.log({ ...props });
    return (
      <button className={className} {...props}>
        {children}
      </button>
    );
  }
}
