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
        this.select = props.select;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const val = event.target.value === "_all_" ? null : [event.target.value];
        this.setState({value: val});
        this.select(val);
    }
    
    render() {
        return <div>
            <select value={this.state.value} onChange={this.handleChange}>
            <option value="_all_">select</option>
            {this.props.list.map(name => 
                <option value={name}>{name}</option>)
            }
            </select>
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
        <tr><th colspan="2">
            <button onClick={() => socket.emit("run", props.name)}>run</button>
        </th></tr>
        {times}
        </tbody>
    );
}

function MainList(props) {
    const [selected, setSelected] = useState(null);
    const resultss = Object.entries(props.list).sort()
        .filter(([k, v]) => !selected || selected.includes(v.name)).map(([k, v]) => (
        <Results name={v.name} times={v.times} socket={props.socket}/>
    ));
    return (
        <div id="main">
        <AlgoSelect
            list={props.names}
            select={setSelected}
        />
        <div><table> {resultss} </table></div>
        </div>
    );
}

function Main(props) {
    const [resultss, setResultss] = useState({});
    const [names, setNames] = useState([]);
    useEffect(() => {
        socket.on("push_names", resp => { setNames(resp.algos.sort()); });
        socket.on("push_results", resp => { 
            setResultss((prevState) => {
                return {...prevState, ...resp};
            });
        });
    });
    return <MainList names={names} list={resultss} socket={socket}/>;
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
