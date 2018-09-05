// this code shows the a user options page and its connect.js code

import { connect } from 'react-redux';
import { changeActiveSet, changeActiveBrd } from '../../actions';
import Landing from './Landing';

const mapDispatchToProps = (dispatch) => {
    return {
        changeActiveSet: ChosenSet => dispatch(changeActiveSet(ChosenSet)),
        changeActiveBrd: ChosenBrd => dispatch(changeActiveBrd(ChosenBrd)),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Landing);

// this shows the link between 
import Landing from './connect';

export default Landing;

// component code

import React from 'react';
import '../../styles/global.scss';
import 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Particles from 'react-particles-js';
import {RadioGroup, Radio} from 'react-radio-group';

import qScore from '../../data/qScoreData.json';


let changeTime;
let changedTime;

class Landing extends React.Component {
    constructor(props) {
        super(props);
        // this does work - because the set gets saved here in the landing
        // page. But, I have not figured out or had the time
        // to figure out how to use the localStorage to save 
        const savedState = JSON.parse(localStorage.getItem('state'));
        // this.state = savedState;

        // if savedState then
        if (savedState) {
            this.state = {
                selectedSetValue: savedState.selectedSetValue,
                selectedbrdValue: savedState.selectedbrdValue,
                whichSet: savedState.whichSet
            };
        } else {
            this.state = {
                selectedSetValue: ' ',
                selectedbrdValue: ' ',
                whichSet: ' '
            };
        }


        if (this.state.whichSet === undefined) {
        console.log(this.state);
        console.log(`⑆⑆⑆⑆⑆`);
        }

        // console.log(this.state.whichSet, 'Im trying to see what this will come back as');


        this.handlebrdChange = this.handlebrdChange.bind(this);
        this.handleSetChange = this.handleSetChange.bind(this);

        this.props.changeActivebrd(this.state.selectedbrdValue);
    }

    componentWillMount() {
        const body = document.body;
        body.style.cssText = 'background-image: url(http://res.cloudinary.com/dt7oesi98/image/upload/v1509029960/qbk1_ys7aiy.jpg)';
        // this.props.changeActiveSet(this.state.whichSet);
        // this.props.changeActivebrd(this.state.selectedbrdValue);
    }

    componentDidMount() {
        console.log('this component has mounted, did mount');
        changeTime = Date.now();
        console.log(changeTime);
        const putDateHere = document.querySelector('.theDate');
        console.warn(this.state.whichSet);

        function getTimeStr() {
            const dt = new Date();
            const d = dt.toLocaleDateString();
            let t = dt.toLocaleTimeString();
            t = t.replace(/\u200E/g, '');
            // t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
            t = t.replace(/^([^\d]*\d{1,2}\d{1,2})\d{1,2}([^\d]*)$/, '$1$2');
            const result = d + ' ' + '| ' + '<span class="landing-clock-time">' + t + '</span>';
            putDateHere.innerHTML = result;
        }
        getTimeStr();

        // here in componentDidMount: set state to be equal to localStorage

        this.state.whichSet = this.state.selectedSetValue;
        this.state.selectedbrdValue = this.state.selectedbrdValue;
    }

    componentWillUnmount() {
        changedTime = Date.now();
        console.log(changedTime - changeTime);
        
        // this problem is solved provisionally
    }

    passWhichSet() {
        // this.props.router.push('/');
    }

    handlebrdChange(value) {
        this.setState({selectedbrdValue: value});
        setTimeout( () => {console.warn(this.state); console.warn('YO KITTEN ITS THIS ' + this.state.selectedbrdValue); this.state.whichSet = this.state.selectedSetValue;}, 1000);
        // this.state.whichSet = this.state.selectedbrdValue;
    }

    handleSetChange(value) {
        this.setState({selectedSetValue: value});
        setTimeout( () => { console.warn(this.state); this.state.whichSet = this.state.selectedSetValue;}, 1000);
    }

    render() {
        // console.log('cheeseburger');
        return (
            <div>
                <Particles
                 params={{
                     particles: {
                         number: {
                             value: 95
                         }
                     },
                     interactivity: {
                         detect_on: 'canvas',
                         events: {
                             onhover: {
                                 enable: true,
                                 mode: 'grab'
                             }
                         }
                     }
                 }}
                />
            <div id="landing-page">
                <div className="container">
                    <p className="theDate"></p>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="panel1">
                                    <p className="qS"><span><br/>{qSe.$Q}</span></p>
                                    
                              <p className="greeting">welcome back</p>
                              <p>Last visit you selected: <span className="selectedOption">Co A</span></p>
                                    <p>xxxx: <span className="selectedOption">...</span></p>
                                    <p>xxxx: <span className="selectedOption">...</span></p>
                            </div>
                        
                        </div>
                        <div className="col-md-6">
                            <div className="panel3">
                            <div className="today-q">
                                        <p>What brd xxxxyzxx?</p>
                                
                                        <RadioGroup name="brdChoice" selectedValue={this.state.selectedbrdValue} onChange={this.handlebrdChange}>
                                            <label><Radio value="Brd1" />Brd1</label> 
                                            <label><Radio value="Brd2" />Brd2</label>
                                        </RadioGroup>
                                </div>
                                <p>Across geographic area: <span className="selectedOption">USA</span></p>
                                        <p className="opt-for">Solve For:</p>
                                        
                                        <RadioGroup name="whichSetChoice" selectedValue={this.state.selectedSetValue} onChange={this.handleSetChange}>
                                            <label><Radio value="Cnv" />Cnv</label>
                                            <label><Radio value="prof" />prof</label>
                                            <label><Radio value="IOR" />IOR</label>

                                        </RadioGroup>
                                        <button
                                            onClick={() => {
                                                this.state.whichSet = this.state.selectedSetValue;
                                                this.props.changeActiveSet(this.state.whichSet);
                                                this.props.changeActivebrd(this.state.selectedbrdValue);
                                                this.props.history.push('/'); // this sends you to the homepage (MainMode)
                                                console.log(this.state);
                                                console.log('your brd is this brd: ' + this.state.selectedbrdValue);
                                                localStorage.setItem('state', JSON.stringify(this.state));
                                                console.log(localStorage); // 😎
                                                // this.state.whichSet = this.state.selectedbrdValue;
                                            }}>
                                            Show
                                        </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

Landing.propTypes = {
    selectedSetValue: PropTypes.string,
    selectedbrdValue: PropTypes.string,
    changeActiveSet: PropTypes.func,
    changeActivebrd: PropTypes.func,
    history: PropTypes.object,
    localStorage: PropTypes.object

};

export default withRouter(Landing);
