import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Tester.css";

const Tester = () => {
    const target = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident deleniti nobis doloribus obcaecati. Mollitia possimus fuga eius molestias. Perspiciatis, magni.";

    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60);
    const [duration, setDuration] = useState(60);
    const [isRunning, setIsRunning] = useState(false);
    const [accuracy, setAccuracy] = useState(0);
    const [wpm, setWpm] = useState(0);

    function handleInputChange(e) {
        const value = e.target.value;

        if (!isRunning) {
            setStartTime(Date.now());
            setIsRunning(true);
        }

        setInput(value);
    }

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        }

        if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            calculateStats();
        }
    }, [isRunning, timeLeft]);

    function calculateStats() {
        const correct = input.split('').filter((ch, i) => ch === target[i]).length;
        const acc = (correct / input.length) * 100 || 0;

        const minutes = (duration - timeLeft) / 60;
        const words = input.trim().split(' ').filter(Boolean).length;
        const speed = Math.round(words / minutes) || 0;

        setAccuracy(acc.toFixed(1));
        setWpm(speed);
    }

    function resetTest(newDuration = duration) {
        setInput("");
        setTimeLeft(newDuration);
        setStartTime(null);
        setIsRunning(false);
        setAccuracy(0);
        setWpm(0);
    }


    function handleDurationChange(e) {
        const newTime = parseInt(e.target.value);
        setDuration(newTime);
        resetTest(newTime);
    }

    function renderText() {
        return target.split('').map((char, i) => {
            let className = '';
            if (i < input.length) {
                className = input[i] === char ? 'correct' : 'incorrect';
            }
            return (
                <span key={i} className={className}>{char}</span>
            );
        });
    }

    return (
        <div id="test_div">
            <Link to="/" id="test_back_body">
                ⬅ Back
            </Link>

            <div id="test_text_div">{renderText()}</div>
            <input
                id="test_inp"
                type="text"
                placeholder="Start typing here..."
                value={input}
                onChange={handleInputChange}
                disabled={timeLeft === 0}
            />
            <div id="test_stats_div">
                <div id="test_stats_speed"><strong>Time Left:</strong> {timeLeft}s</div>
                <div id="test_stats_speed"><strong>WPM:</strong> {wpm}</div>
                <div id="test_stats_speed"><strong>Accuracy:</strong> {accuracy}%</div>
            </div>
            <div id="test_stats_div">
                <label>
                    <input
                        type="radio"
                        value={30}
                        onChange={handleDurationChange}
                        checked={duration === 30}
                    /> 30s
                </label>
                <label>
                    <input
                        type="radio"
                        value={60}
                        onChange={handleDurationChange}
                        checked={duration === 60}
                    /> 60s
                </label>
                <button id="test_reset_btn" onClick={resetTest}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Tester;
