import React from 'react';
import { IMyInputProps } from '../../interfaces/Input.interface';

export default class MyButton extends React.Component<IMyInputProps> {
  render() {
    const { children, className, ...props } = this.props;
    return (
      <button className={className} {...props}>
        {children}
      </button>
    );
  }
}
