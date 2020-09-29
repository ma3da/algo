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
        <tr><td colspan="2"> params: {props.args} </td></tr>
        <tr><th colspan="2">
            <button disabled={props.generating} 
                    onClick={() => props.socket.emit("run", props.name)}
            >run</button>
            <button
                disabled={props.generating}
                onClick={() => {
                    props.socket.emit("generate", props.name);
                    props.setgenerating(props.name, true);
                }}
            >generate</button>
        </th></tr>
        {times}
        </tbody>
    );
}

function MainList(props) {
    const [selected, setSelected] = useState(null);
    const resultss = Object.entries(props.list).sort()
        .filter(([k, v]) => !selected || selected.includes(v.name)).map(([k, v]) => (
        <Results
            name={v.name}
            times={v.times}
            args={props.argss[v.name]}
            socket={props.socket}
            generating={props.generating}
            setgenerating={props.setgenerating}
            />
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

function Notif(props) {
    return <div class="notif"> {props.text} </div>;
}

function NotifList(props) {
    const notifs = props.notifs.map(n => <Notif text={n.text} />);
    return (
        <div id="notif-list">
        { notifs }
        <Notif text="notification message" />
        </div>
    );
}

function Main(props) {
    const [notifs, addNotif] = useState([]);
    const [resultss, setResultss] = useState({});
    const [argss, setArgss] = useState({});
    const [names, setNames] = useState([]);
    const [generating, setGenerating] = useState(false);
    useEffect(() => {
        socket.on("push_names", resp => { setNames(resp.algos.sort()); });
        socket.on("push_results", resp => { 
            setResultss((prevState) => {
                return {...prevState, ...resp};
            });
        });
        socket.on("push_generate_args", resp => { 
            setArgss((prevState) => {
                return {...prevState, ...resp};
            });
        });
        socket.on("end_generate", resp => { setGenerating(false); });
    });
    return (
        <div>
        <MainList 
        names={names} 
        list={resultss} 
        argss={argss}
        socket={socket}
        generating={generating}
        setgenerating={setGenerating}
        />
        <NotifList notifs={notifs} />
        </div>
    );
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
