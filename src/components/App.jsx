import React, { useState, useEffect } from "react";
import Heading from "./Heading";
import Box from "./Box"
import wonSound from "../sounds/won.wav"

function App() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState(Array(9).fill(null))
    const [won, setWon] = useState(false);
    const [wonChar, setChar] = useState("");
    const [filled, setFilled] = useState(false)
    useEffect(() => {
        stopGame();
    }, [data]);

    useEffect(() => {
        if (won) {
            makeSound(wonSound);
            const timeout = setTimeout(() => {
                setWon(false);
                setData(Array(9).fill(null));
                setCount(0);
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [won]);

    function makeSound(soundItem) {
        new Audio(soundItem).play();
    }
    function handleComponent(id) {
        console.log("id is ", id);
        if (count % 2 == 0) {
            setData((prevData) => {
                const copyData = [...prevData];
                copyData[id] = "X";
                return copyData;
            });
        }
        else {
            setData((prevData) => {
                const copyData = [...prevData];
                copyData[id] = "O";
                return copyData;
            });
        }
        setCount(count + 1);
    }

    function stopGame() {
        for (let i = 0; i < 7; i += 3) {
            if ((data[i] == "X" || data[i] == "O") && data[i] == data[i + 1] && data[i + 1] == data[i + 2] && data[i + 2] == data[i]) {
                setChar(data[i]);
                setWon(true);
            }
        }
        for (let i = 0; i < 3; i++) {
            if ((data[i] == "X" || data[i] == "O") && data[i] == data[i + 3] && data[i + 3] == data[i + 6] && data[i + 6] == data[i]) {
                setChar(data[i]);
                setWon(true);
            }
        }
        if ((data[0] == "X" || data[0] == "O") && data[0] == data[4] && data[4] == data[8] && data[8] == data[0]) {
            setChar(data[0]);
            setWon(true);
        }
        if ((data[2] == "X" || data[2] == "O") && data[2] == data[4] && data[4] == data[6] && data[6] == data[2]) {
            setChar(data[2]);
            setWon(true);
        }
    }

    function isFilled() {
        for (let i = 0; i < 9; i++) {
            if (data[i] == null) {
                return false;
            }
        }
        return true;
    }
    function handleFilled() {
        setFilled(isFilled);
    }

    function resetGame(clicked) {
        if (clicked) {
            setWon(false);
            setData(Array(9).fill(null));
            setCount(0);
        }
    }
    return <div>
        <Heading title={!won ? "Welcome! Tap any box to start the game" : `Player ${wonChar} won!`} />
        <div className="container">
            <div className="game-box">
                <Box className="box-item" id={0} innerContent={data[0]} handleComponent={handleComponent} wonVar={won} click={isFilled} />
                <Box className="box-item" id={1} innerContent={data[1]} handleComponent={handleComponent} wonVar={won} click={isFilled} />
                <Box className="box-item" id={2} innerContent={data[2]} handleComponent={handleComponent} wonVar={won} click={isFilled} />
                <Box className="box-item" id={3} innerContent={data[3]} handleComponent={handleComponent} wonVar={won} click={isFilled} />
                <Box className="box-item" id={4} innerContent={data[4]} handleComponent={handleComponent} wonVar={won} click={isFilled} />
                <Box className="box-item" id={5} innerContent={data[5]} handleComponent={handleComponent} wonVar={won} click={isFilled} />
                <Box className="box-item" id={6} innerContent={data[6]} handleComponent={handleComponent} wonVar={won} click={isFilled} />
                <Box className="box-item" id={7} innerContent={data[7]} handleComponent={handleComponent} wonVar={won} click={isFilled} />
                <Box className="box-item" id={8} innerContent={data[8]} handleComponent={handleComponent} wonVar={won} click={isFilled} />
            </div>
        </div>
        <div class="play-again">
            <button className="btn" onClick={() => {
                handleFilled();
                resetGame(isFilled);
            }} >Play again</button>
        </div>
    </div>
}

export default App;