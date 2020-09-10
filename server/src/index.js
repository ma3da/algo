import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
const socket = io(ENDPOINT);

function TimeList(props) {
    const times = Object.entries(props.times).map(([k, v]) => (
        <li> {k}: {v} </li>
    ));
    return (
        <div>
        <h1> {props.name} </h1>
        <ul> {times} </ul>
        </div>
    );
}

class AlgoSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    render() {
        return <div>
            <select value={this.state.value} onChange={this.handleChange}>
            <option value="">select</option>
            {this.props.list.map(name => 
                <option value={name}>{name}</option>)
            }
            </select>
            <button onClick={this.props.fetchAlgo}>fetch</button>
            <button onClick={() => this.props.runAlgo(this.state.value)}>run</button>
        </div>;
    }
}

function Main(props) {
    const [timelist, setList] = useState("");
    const [algos, setAlgos] = useState([]);
    useEffect(() => {
        socket.on("update", resp => { 
            setList([<TimeList name={resp.name} times={resp.times}/>]) ;
        });
        socket.on("push-algos", resp => { setAlgos(resp.algos); });
    }, []);
    return <div>
        <AlgoSelect
            list={algos}
            fetchAlgo={() => socket.emit("fetch-algos", null)}
            runAlgo={(name) => socket.emit("run", name)}
        />
        <div>{timelist}</div>
        </div>;
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
