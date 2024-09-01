import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../redux/slices/filterSlice';

const Categories = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.filters.activeCategory);
  const [localActiveCategory, setLocalActiveCategory] = useState(activeCategory);

  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

  useEffect(() => {
    // Синхронизация локального состояния с Redux
    setLocalActiveCategory(activeCategory);
  }, [activeCategory]);

  const handleCategoryClick = (index) => {
    setLocalActiveCategory(index);
    dispatch(setActiveCategory(index)); // Обновление состояния в Redux
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((name, index) => (
          <li
            className={localActiveCategory === index ? 'active' : ''}
            onClick={() => handleCategoryClick(index)}
            key={`${name}_${index}`}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
