import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const CountDownFunctional = props => {
    const { x, y, r, maxMinute, begin, end, dangerZoneMinute, onTimeEnd } = props;
    const perimether = 2 * 3.14 * r;
    let interval = useRef(null);
    const [state, setState] = useState({
        time: end - begin,
        hour: 0,
        minute: 0,
        second: 0,
        color: "green",
        dasharray: 0,
        isEnd: false,
    });
    useEffect(() => {
        let { time, hour, minute, second, color, dasharray, isEnd } = state;
        let totalMinute = 0;

        interval.current = setInterval(() => {
            time += 1000;
            hour = parseInt(time / (1000 * 60 * 60));
            totalMinute = parseInt(time / (1000 * 60));

            isEnd = totalMinute >= maxMinute;
            color = dangerZoneMinute && isEnd ? 'red' : 'green';

            if (!isEnd) {
                minute = totalMinute % 60;
                second = parseInt(time / 1000) % 60;
                dasharray = ((time / 1000) / (maxMinute * 60)) * perimether;
            } else {
                dasharray = perimether;
            }

            if (isEnd && onTimeEnd) {
                clearInterval(interval.current);
                onTimeEnd(interval);
            }

            setState({
                time,
                hour,
                minute,
                second,
                dasharray,
                color
            });

            return clearInterval(interval);
        }, 1000);
    }, []);

    return (
        <>
            <div className="base-timer" title={state.isEnd ? "Süre Bitti" : `${maxMinute - state.minute} min`}>
                <svg className="base-timer__svg" viewBox="0 0 100 100">
                    <g className="base-timer__circle">
                        <circle className="base-timer__path-elapsed" cx={x} cy={y} r={r}></circle>
                        <path
                            id="base-timer-path-remaining"
                            strokeDasharray={`${state.dasharray} ${perimether}`}
                            className={`base-timer__path-remaining`}
                            style={{ color: state.color }}
                            d={
                                ` M ${x}, ${y}
                                     m -45, 0
                                     a 45,45 0 1,0 90,0
                                     a 45,45 0 1,0 -90,0`
                            }
                        ></path>
                    </g>
                </svg>
                <span id="base-timer-label" className="base-timer__label">
                    <div className="counter">
                        <label className="counter-hour" title={`${state.hour} hour`}>{state.hour.toString().length < 2 ? `0${state.hour}` : state.hour} : </label>
                        <label className="counter-minute" title={`${state.minute} minute`}>{state.minute.toString().length < 2 ? `0${state.minute}` : state.minute} : </label>
                        <label className="counter-second" title={`${state.second} second`}>{state.second.toString().length < 2 ? `0${state.second}` : state.second}</label>
                    </div>
                </span>
            </div>
        </>
    );
}

CountDownFunctional.propTypes = {
    begin: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date),
    x: PropTypes.number,
    y: PropTypes.number,
    r: PropTypes.number,
    maxMinute: PropTypes.number,
    dangerZoneMinute: PropTypes.number,
    onTimeEnd: PropTypes.func,
};

CountDownFunctional.defaultProps = {
    end: new Date(),
    x: 50,
    y: 50,
    r: 45,
    maxMinute: 30,
    onTimeEnd: interval => {
        clearInterval(interval);
    }
};

export default CountDownFunctional;