import React, { useContext } from "react";
import MenuContext from "./Context";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function MenuItem() {

  // Pull the necessary variables from context and from parameters
  const { category, id } = useParams();
  const { menu } = useContext(MenuContext);
  const selection = menu[`${category.toLowerCase()}`];

  // Redirect to the category page if a nonexistent item is picked
  const cantFind = `/${category}`;
  let item = selection.find(i => i.id === id);
  if (!item) return <Redirect to={cantFind} />;

  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {item.name}
          </CardTitle>
          <CardText className="font-italic">{item.description}</CardText>
          <p>
            <b>Recipe:</b> {item.recipe}
          </p>
          <p>
            <b>Serve:</b> {item.serve}
          </p>
        </CardBody>
      </Card>
    </section>
  );
}

export default MenuItem;
