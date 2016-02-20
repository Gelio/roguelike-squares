// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Header from './components/Header';
import Game from './components/Game';

class Layout extends React.Component {
    render() {
        return (
            <div>
                <Header />

                <Game />
            </div>
        );
    }
}

ReactDOM.render(<Layout />, document.getElementById('app'));