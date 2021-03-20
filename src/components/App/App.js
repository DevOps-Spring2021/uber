import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BookRide from '../BookRide/BookRide';
import Nav from '../UberNavbar/UberNavbar';
import Rides from '../Rides/Rides';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from "react-bootstrap";
import RideDetails from '../RideDetails/RideDetails';
import TestHealth from "../Test/TestHealth";
import TestComms from "../Test/TestComms";
function App() {
  return (
    <BrowserRouter>
      <div className="bg-dark">
        <Container>
          <Nav></Nav>
        </Container>
      </div>
      <Container>
        <Switch>
          <Route path="/" exact component={BookRide}></Route>
          <Route path="/rides/:id" component={RideDetails}></Route>
          <Route path="/rides" component={Rides}></Route>
          <Route path="/testHealth" component={TestHealth}></Route>
          <Route path="/testComms" component={TestComms}></Route>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App;
