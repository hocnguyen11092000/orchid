import { ShoppingBag } from "@mui/icons-material";
import { CardList } from "features/Home/pages/Home";
import React from "react";
import "./card.scss";

type Props = {
  listCard?: Array<CardList>;
};

const Card = (props: Props) => {
  const { listCard } = props;
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {listCard &&
        listCard.map((item, index) => (
          <div key={index} className="home__card-container-card">
            <div className="home__card-container-card-badge">{item.icon}</div>
            <div>
              <div className="home__card-container-card-total">
                {item.count}
              </div>
              <div className="home__card-container-card-name">{item.name}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Card;
