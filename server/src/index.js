import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import "./main.css"
import axios from "axios";


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

function formatTime(s) {
    if (Number.isNaN(Number.parseFloat(s))) {
        switch(s) {
            case "WA":
            case "failed":
                return s;
            case "running":
                return <i style={{color: "grey"}}>{s}</i>;
            default:
                return "?";
        }
    } else {
        return Number.parseFloat(s).toFixed(3) + "s";
    }
}

function ResultsPlot(props) {
    return props.data ? <img src={"data:image/png;base64," + props.data} />
                      : <span>no plot</span>;
}

function Results(props) {
    const [data, setData] = useState("");
    const times = Object.entries(props.times).map(([k, v]) => (
        <tr>
        <td>{k}</td>
        <td>
        {formatTime(v)}
        </td>
        </tr>
    ));
    useEffect(() => {
        axios
          .get("/plot/" + props.name)
          .then(resp => setData(resp.data))
          .catch(console.log);
    });
    return (
        <tbody>
        <tr><th colSpan="2"> {props.name} </th></tr>
        <tr><td colSpan="2"> params: {props.args} </td></tr>
        <tr><th colSpan="2">
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
        <tr>
        <td colSpan="2"><ResultsPlot data={data}/></td>
        </tr>
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
        <div><table>{resultss}</table></div>
        </div>
    );
}

function Notif(props) {
    // useEffect(() => {
    //     const timeout = setTimeout(() => { props.setnotifs((prevState) =>
    //         { return prevState.slice(1); }) }, 2000);
    //     return () => clearTimeout(timeout);
    // });
    return <div className="notif"> {props.text} </div>;
}

function NotifList(props) {
    const notifs = props.notifs.map(msg => <Notif text={msg} setnotifs={props.setnotifs} />);
    return (
        <div id="notif-list">
        { notifs }
        </div>
    );
}

function Main(props) {
    const [socket, setSocket] = useState(null);
    const [notifs, setNotifs] = useState([]);
    const [resultss, setResultss] = useState({});
    const [argss, setArgss] = useState({});
    const [names, setNames] = useState([]);
    const [generating, setGenerating] = useState(false);
    useEffect(() => {
        setSocket(io(
            "http://localhost:5000",
            {
                timeout: 5000
            }
        ));
    }, []);
    useEffect(() => {
        if (!socket) return;

        socket.on("push_names", resp => { setNames(resp.algos.sort()); });
        socket.on("push_results", resp => { 
            setResultss((prevState) => {
                return {...prevState, ...resp};
            });
        });
    }, [socket]);
    useEffect(() => {
        if (!socket) return;

        socket.on("push_generate_args", resp => { 
            setArgss((prevState) => {
                return {...prevState, ...resp};
            });
        });
        socket.on("end_generate", resp => { setGenerating(false); });
    }, [socket]);
    useEffect(() => {
        if (!socket) return;

        // ...
        socket.on("notification", resp => {
            setNotifs((prevState) => { return prevState.concat([resp]); });
            const timeout = setTimeout(() => { setNotifs((prevState) =>
                { return prevState.slice(1); }) }, 2000);
            return () => clearTimeout(timeout);
        });
    }, [socket]);
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
        <NotifList notifs={notifs} setnotifs={setNotifs} />
        </div>
    );
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
