import React, { useEffect } from "react";
import Category from "../components/Category";
import PizzaBlock from "../components/PizzaBlock";
import SortPopup from "../components/SortPopup";

import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import PizzaBlockLoading from "../components/PizzaBlockLoading";
import { selectFilterCategoryId } from "../redux/slices/filterSlice";
import { RootState, useAppDispatch } from "../redux/store";
import { useAuth } from "../components/auth/Auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();

  const isLoaded = useSelector((state) => state.pizza.isLoaded);
  const items = useSelector((state) => state.pizza.items);
  const categoryId = useSelector(selectFilterCategoryId);
  const sortBy = useSelector((state) => state.filter.sortBy.backendName);

  const getPizzas = async () => {
    dispatch(fetchPizzas({ categoryId, sortBy }));
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortBy]);

  return (
    <div className="home">
      <div className="home__sort">
        <Category />
        <SortPopup />
      </div>
      <h2 className="home__label">Всі піци</h2>
      <div className="home__pizzas">
        {isLoaded
          ? items.map((obj) => (
              <PizzaBlock
                id={obj.id}
                imageUrl={obj.imageUrl}
                price={obj.price}
                title={obj.title}
                types={obj.types}
                key={`${obj.id}_${obj.title}`}
              />
            ))
          : [...new Array(8)].map((_, index) => <PizzaBlockLoading key={index} />)}
      </div>
    </div>
  );
};

export default Home;
