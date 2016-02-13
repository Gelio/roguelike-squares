// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

class Layout extends React.Component {
    render() {
        return (
            <div>
                Roguelike squares
            </div>
        );
    }
}

ReactDOM.render(<Layout />, document.getElementById('app'));