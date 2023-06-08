import React, { useContext } from "react";
import MenuContext from "./Context";
import { Card, CardBody, CardTitle } from "reactstrap";

function Home({snacks, drinks}) {
  const { menu } = useContext(MenuContext);
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
            <p>We offer {menu.snacks.length} items on our dining menu and {menu.drinks.length} selections on our celebrated drink menu.</p>
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
