import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

const typesNames = ['thin', 'traditional'];

const PizzaBlock = ({ id, title, price, imageUrl, types, sizes }) => {
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((item) => item.id === id));
  const count = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id, // Ensure the id is passed
      title,
      price,
      imageUrl,
      type: typesNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => (
            <li
              key={index}
              className={activeType === index ? 'active' : ''}
              onClick={() => setActiveType(index)}>
              {typesNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              className={activeSize === index ? 'active' : ''}
              onClick={() => setActiveSize(index)}>
              {size} cm
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from {price} $</div>
        <div onClick={onClickAdd} className="button button--outline button--add">
          <span>Add</span>
          {count > 0 && <i>{count}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
