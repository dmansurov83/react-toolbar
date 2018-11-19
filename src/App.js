import React, {Component} from 'react';
import './App.css';
import Toolbar from "./react-toolbar/Toolbar";
import ToolbarItem from "./react-toolbar/ToolbarItem";

const itemsCount = 20;
const items = Array.apply(null, {length: itemsCount}).map(Number.call, Number);

class App extends Component {
    render() {
        return (
            <div className="App">
                <Toolbar>
                    {items.map(item =>
                        <ToolbarItem key={item}>
                            <button>{`item ${item}`}</button>
                        </ToolbarItem>
                    )}
                </Toolbar>
            </div>
        );
    }
}

export default App;
