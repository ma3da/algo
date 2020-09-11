import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import "./main.css"

const ENDPOINT = "http://localhost:5000";
const socket = io(ENDPOINT);

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

function Results(props) {
    const times = Object.entries(props.times).map(([k, v]) => (

        <tr>
        <td>{k}</td>
        <td>
        {Number.isNaN(Number.parseFloat(v)) ? v : Number.parseFloat(v).toFixed(3) + "s"}
        </td>
        </tr>
    ));
    return (
        <tbody>
        <tr><th colspan="2"> {props.name} </th></tr>
        {times}
        </tbody>
    );
}

function MainList(props) {
    const resultss = Object.entries(props.list).map(([k, v]) => (
        <Results name={v.name} times={v.times} />
    ));
    return <div><table> {resultss} </table></div>;
}

function Main(props) {
    const [resultss, setResultss] = useState({});
    const [algos, setAlgos] = useState([]);
    useEffect(() => {
        socket.on("push_names", resp => { setAlgos(resp.algos); });
        socket.on("push_results", resp => { setResultss(resp); });
        socket.on("update", resp => { 
            setResultss((prevState) => {
                return {...prevState, ...resp};
            });
        });
    });
    return <div id="main">
        <AlgoSelect
            list={algos}
            fetchAlgo={() => socket.emit("fetch-algos", null)}
            runAlgo={(name) => socket.emit("run", name)}
        />
        <MainList list={resultss} />
        </div>;
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
