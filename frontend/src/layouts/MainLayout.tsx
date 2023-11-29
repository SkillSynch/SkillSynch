import React from 'react';
import Banner from '../components/Banner';

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Banner />
      {children}
    </div>
  );
}
