import React from 'react';

const Categories = () => {
  const [activeItem, setActiveItem] = React.useState(0);
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];
  return (
    <div className="categories">
      <ul>
        {categories.map((name, index) => (
          <li
            className={activeItem === index ? 'active' : ''}
            onClick={() => {
              setActiveItem(index);
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
