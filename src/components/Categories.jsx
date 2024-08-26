import React from 'react';

const Categories = ({ value, onClickCategory }) => {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];
  return (
    <div className="categories">
      <ul>
        {categories.map((name, index) => (
          <li
            className={value === index ? 'active' : ''}
            onClick={() => {
              onClickCategory(index);
            }}
            key={`${name}_${index}`}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
