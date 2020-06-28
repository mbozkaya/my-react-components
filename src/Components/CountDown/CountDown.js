import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CountDown extends Component {
    constructor(props) {
        super(props);
        const { begin, end, r } = props;
        this.perimether = 2 * 3.14 * r;;
        this.interval = 0;
        this.state = {
            time: end - begin,
            hour: 0,
            minute: 0,
            second: 0,
            color: "green",
            dasharray: 0,
            isEnd: false,
        };
    }

    componentDidMount() {
        let { time, hour, minute, second, color, dasharray, isEnd } = this.state;
        const { dangerZoneMinute, maxMinute, onTimeEnd } = this.props;

        this.interval = setInterval(() => {
            time += 1000;
            hour = parseInt(time / (1000 * 60 * 60));
            minute = parseInt(time / (1000 * 60)) % 60;
            second = parseInt(time / 1000) % 60;
            dasharray = (360 / 60 * minute) * (this.perimether / 360);
            color = dangerZoneMinute && minute >= dangerZoneMinute ? 'red' : 'green';
            isEnd = minute >= maxMinute;

            if (isEnd && onTimeEnd){
                clearInterval(this.interval);
                onTimeEnd(this.interval);
            }


            return this.setState({ time, hour, minute, second, dasharray, color });
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        const { hour, minute, second, color, dasharray } = this.state;
        const { x, y, r, maxMinute } = this.props;
        return (
            <>
                <div class="base-timer" title={maxMinute - minute < 0 ? "Süre Bitti" : `${maxMinute - minute} min`}>
                    <svg class="base-timer__svg" viewBox="0 0 100 100">
                        <g class="base-timer__circle">
                            <circle class="base-timer__path-elapsed" cx={x} cy={y} r={r}></circle>
                            <path
                                id="base-timer-path-remaining"
                                stroke-dasharray={`${dasharray} ${this.perimether}`}
                                className={`base-timer__path-remaining`}
                                style={{ color: color }}
                                d={
                                    ` M ${x}, ${y}
                                     m -45, 0
                                     a 45,45 0 1,0 90,0
                                     a 45,45 0 1,0 -90,0`
                                }
                            ></path>
                        </g>
                    </svg>
                    <span id="base-timer-label" class="base-timer__label">
                        <div className="counter">
                            <label className="counter-hour" title={`${hour} hour`}>{hour.toString().length < 2 ? `0${hour}` : hour} : </label>
                            <label className="counter-minute" title={`${minute} minute`}>{minute.toString().length < 2 ? `0${minute}` : minute} : </label>
                            <label className="counter-second" title={`${second} second`}>{second.toString().length < 2 ? `0${second}` : second}</label>
                        </div>
                    </span>
                </div>

            </>
        );
    }
}

CountDown.propTypes = {
    begin: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date),
    x: PropTypes.number,
    y: PropTypes.number,
    r: PropTypes.number,
    maxMinute: PropTypes.number,
    dangerZoneMinute: PropTypes.number,
    onTimeEnd: PropTypes.func,
};

CountDown.defaultProps = {
    end: new Date(),
    x: 50,
    y: 50,
    r: 45,
    maxMinute: 30,
    onTimeEnd: () => {
        clearInterval(this.interval);
    }
};

export default CountDown;