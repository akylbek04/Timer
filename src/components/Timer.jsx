import './Timer.css';
import React from 'react';


class Timer extends React.Component{

    constructor(){
        super();
        this.state = {
            seconds: 0,
            intervalId: 0,
            delayTime: 1000,
            inputValue: ''
        }
    }

    stopCount = () => {

        const {intervalId} = this.state
        clearInterval(intervalId);
        this.setState(prevState => {
            return({
                ...prevState,
                intervalId: 0
            })
        })
    }

    startCount = () => {

        const {delayTime} = this.state

        const newIntervalId = setInterval(() => {
            this.setState(prevState => {
                return({
                    ...prevState, 
                    seconds: prevState.seconds + 1
                })
            })
        } , delayTime)

        this.setState(prevState => {
            return({
                ...prevState,
                intervalId: newIntervalId
            })
        })
    }

    reset = () => {
        this.setState(prevState => {
            return({
                ...prevState,
                seconds: 0
            })
        })
    }

    updateSpeed = () => {
        const { inputValue } = this.state;
        this.setState({delayTime: inputValue});
        this.setState({inputValue: ''})
    }

    render(){
        // nicknaming => const { seconds: anything } = this.state
        const {seconds, intervalId, inputValue} = this.state;
        const {startCount, stopCount, reset, updateSpeed} = this
        const btnLabel = intervalId === 0 ? "Start counter" : "Stop counter"
        const btnAction = intervalId === 0 ? startCount : stopCount

        return(
            <>
                <h2>The Component has been rendered for {seconds} seconds</h2>
                <button className='btn' onClick={btnAction}>{btnLabel}</button>
                <button onClick={reset}>Reset</button>
                <div className="input-card">
                    <input 
                        value={inputValue} 
                        onChange={(e) => {
                            this.setState({inputValue: e.target.value})
                        }} 
                        placeholder='set your speed...'

                    />
                    <button onClick={updateSpeed} className="btnV">Speed</button>
                </div>
            </>
        )
    }
}


export default Timer;
