import React from 'react';
import CategoryItemCard from '@/components/CategoryItemCard';

// The component now receives 'items' as a prop
const CategoryGrid = ({ items }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-y-10 gap-x-4">
      {/* We map over the received 'items' prop */}
      {/* We also add a check to ensure items exists and is an array before mapping */}
      {items && items.map(item => (
        <CategoryItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CategoryGrid;