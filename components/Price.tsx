import React from 'react';
import InfiniteMenu from './InfiniteMenu';
import { items } from '@/data';

const Price = () => {
  return (
    <section className="h-[100vh] overflow-hidden relative pt-15 md:pt-0">
      <div style={{ height: 'full', position: 'relative' }}>
        <InfiniteMenu items={items} />
      </div>
    </section>
  )
};

export default Price;