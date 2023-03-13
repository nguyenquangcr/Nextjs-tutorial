import React from 'react';

export interface HeaderProps {}

export default function HeaderComponent(props: HeaderProps) {
  console.log('render header');

  return <div className="header">HeaderComponent</div>;
}
