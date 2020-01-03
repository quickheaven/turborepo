import React, { Component } from "react";

class App extends Component {
    state = { displayBio: false };

    toggleDisplayBio = () => {
        this.setState({ displayBio: !this.state.displayBio });
    }

    render() {
        return (
            <div>
                React App
            </div>)
    }
}


export default App;