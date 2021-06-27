import logo from './logo.svg';
import './App.css';
import react from "react";
import { About } from "./About.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { SocialIcon } from 'react-social-icons';
function App() {

  let items;
  if (localStorage.getItem("list") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("list"));
  }

  const [list, setList] = react.useState(items);
  const [newItem, setNewItem] = react.useState([]);
  react.useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list]);
  const addItem = (todoValue) => {

    if (todoValue !== "") {
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false
      }

      setList([...list, newItem]);
      localStorage.setItem("list", JSON.stringify(list));
      setNewItem("");
    }
  }

  const deleteItem = (id) => {
    //const list = [...this.state.list];
    const updatedList = list.filter(item => item.id !== id);

    setList(updatedList);
    localStorage.setItem("list", JSON.stringify(list));
  }

  const updateInput = (input) => {
    setNewItem(input);
  }
  return (
    <Router>
      <div className="App" >
        <h1>To Do App</h1>
        <img src={logo} alt="" height="50px" width="100px" className="logo" />
        <nav className="navbar" >
          <ul className="nav-menu">
            <li>
              <Link className="hi" to="/">Home</Link>
            </li>
            <li>
              <Link className="hi" to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <br />
        <Switch>
          <Route exact path="/" render={() => {
            return (
              <>
                <div className="container" >
                  Add an Item ...
                  <br></br>
                  <input
                    type="text"
                    className="input-text"
                    placeholder="Write a To Do"
                    required
                    value={newItem}
                    onChange={e => { updateInput(e.target.value) }}
                  />
                  <br />
                  <button className="btn"
                    onClick={() => { addItem(newItem) }}
                    disabled={!newItem.length}
                  >
                    Add-Item
                  </button>
                  <div className="list" >
                    <ul>
                      {list.map(item => {
                        return (
                          <li key={item.id}  >
                            {item.value}<br />
                            <button className="btn-delete"
                              onClick={() => { deleteItem(item.id) }}
                            >Delete</button>
                          </li>
                        );
                      })}
                    </ul>

                  </div>

                </div>
              </>
            )
          }}>


          </Route>
          <Route exact path="/about" >
            <About />
          </Route>
        </Switch>
        <div className="footer">
          <footer  >
            <div className="footer-div" >
              Degined by &copy;Saurabh Jha <br />
              <SocialIcon className="icon" target="_blank" url="https://www.instagram.com/jha_saurabhjha/" />
              <SocialIcon className="icon" target="_blank" url="https://www.facebook.com/saurabh.jha.108889/" />
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}
export default App;
