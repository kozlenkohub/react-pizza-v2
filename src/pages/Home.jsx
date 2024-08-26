import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const [activeCategory, setActiveCategory] = React.useState(0);
  const [activeSort, setActiveSort] = React.useState({ name: 'rating', sort: 'rating' });

  React.useEffect(() => {
    setIsLoaded(false);

    window.scrollTo(0, 0);
    const categoryQuery = activeCategory === 0 ? '' : `category=${activeCategory}&`;
    fetch(
      `https://665d6310e88051d604065b54.mockapi.io/items?${categoryQuery}sortBy=${activeSort.sort}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoaded(true);
      });
  }, [activeCategory, activeSort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={activeCategory}
          onClickCategory={(index) => {
            setActiveCategory(index);
          }}
        />
        <Sort
          value={activeSort}
          onClickSort={(obj) => {
            setActiveSort(obj);
          }}
        />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoaded ? (
          items.length > 0 ? (
            items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
          ) : (
            <p>No items found</p>
          )
        ) : (
          Array(6)
            .fill(0)
            .map((_, index) => <Skeleton key={index} />)
        )}
      </div>
    </div>
  );
};

export default Home;
