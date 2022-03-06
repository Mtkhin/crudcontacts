
import Header from './components/Header';
import { Switch,Route} from "react-router-dom";
import Add from "./components/Add";
import contactsList from "./components/index";
import View from  "./components/View";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path = "/info" component={contactsList} />
        <Route exact path = "/add" component={Add} />
        <Route exact path = "/update/:id" component={Add} />
        <Route exact path = "/view/:id" component={View} />
      </Switch>
    </div>
  );
}

export default App;
