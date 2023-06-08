import React, { useContext, useEffect } from "react";
import MenuContext from "./Context";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import SnackOrBoozeApi from "./Api";
import "./static/Menu.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import Axios from "axios";

function Menu() {

  // Pull all the necessary data from context and from params
  const { menu, setMenu } = useContext(MenuContext);
  const { category } = useParams();
  const title = category;
  let selection = menu[`${category.toLowerCase()}`];

  // Set the introductory blurb - hardcoded
  let text;
  if (category === "snacks") {
    text = "Our catalog is jam-packed with some of the most overpriced store bought items that you can find in the city, enjoy."
  } 
  if (category === "drinks") {
    text = "Our drinks are all poured from a can, even if they're mixed, could you even tell?"
  }

  // this makes the initial state setting almost redundant, 
  // this is my way of making the menu refresh after a form submit
  // using the state or state and context together wouldn't make the children re render, despite trying with multiple contexts and useEffects in different places

  // refresh the menu upon render (for form submits)
  useEffect(() => {
    const refreshMenu = async () => {
      const newMenu = await SnackOrBoozeApi.getMenu();
      setMenu(newMenu);
    }
    refreshMenu();
  }, [])

  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {title}
          </CardTitle>
          <CardText>
            {text}
          </CardText>
          <ListGroup>
            {selection.map(i => (
              <Link to={`/${category}/${i.id}`} key={i.id}>
                <ListGroupItem>{i.name}</ListGroupItem>
              </Link>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default Menu;
