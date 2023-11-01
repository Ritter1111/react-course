import React from 'react';
import { IMyInputProps } from '../../interfaces/search-bar.interface';

export default class MyInput extends React.Component<IMyInputProps> {
  render() {
    const { placeholder, className, ...props } = this.props;
    return <input placeholder={placeholder} className={className} {...props} />;
  }
}
