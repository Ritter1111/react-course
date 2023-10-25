import React from 'react';
import { IMyInputProps } from '../../interfaces/Input.interface';

export default class MyInput extends React.Component<IMyInputProps> {
  render() {
    const { placeholder, className, ...props } = this.props;
    return <input placeholder={placeholder} className={className} {...props} />;
  }
}
