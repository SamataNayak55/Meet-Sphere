import React, { useEffect, useRef, useState } from 'react';
import '../Styles/game.css'

export default function Game() {
    const images = [
        'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400',
        'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=400',
        'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400',
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400',
        'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400',
        'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
        'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400'
    ];

    const boardRef = useRef(null);
    const winModalRef = useRef(null);

    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [timeStr, setTimeStr] = useState('0:00');

    // internal refs to keep mutable values without triggering re-renders
    const firstCardRef = useRef(null);
    const secondCardRef = useRef(null);
    const canFlipRef = useRef(true);
    const secondsRef = useRef(0);
    const timerRef = useRef(null);
    const timerRunningRef = useRef(false);

    useEffect(() => {
        startGame();
        return () => {
            clearInterval(timerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function formatTime(sec) {
        const mins = Math.floor(sec / 60);
        const s = sec % 60;
        return `${mins}:${s < 10 ? '0' + s : s}`;
    }

    function startTimer() {
        timerRunningRef.current = true;
        timerRef.current = setInterval(() => {
            secondsRef.current += 1;
            setTimeStr(formatTime(secondsRef.current));
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timerRef.current);
        timerRef.current = null;
        timerRunningRef.current = false;
        secondsRef.current = 0;
        setTimeStr('0:00');
    }

    function updateStatsUI(newMoves, newMatches) {
        setMoves(newMoves);
        setMatches(newMatches);
    }

    function resetCards() {
        firstCardRef.current = null;
        secondCardRef.current = null;
        canFlipRef.current = true;
    }

    function checkMatch() {
        const first = firstCardRef.current;
        const second = secondCardRef.current;
        if (!first || !second) return;

        const match = first.dataset.image === second.dataset.image;

        if (match) {
            setTimeout(() => {
                first.classList.add('matched');
                second.classList.add('matched');
                // update matches using functional update to avoid stale closures
                setMatches((prevMatches) => {
                    const newMatches = prevMatches + 1;
                    resetCards();
                    if (newMatches === images.length) {
                        // call endGame after state updated; using microtask ensures consistency
                        // but calling here is fine because newMatches is computed
                        endGame();
                    }
                    return newMatches;
                });
            }, 500);
        } else {
            setTimeout(() => {
                first.classList.remove('flipped');
                second.classList.remove('flipped');
                resetCards();
            }, 1000);
        }
    }

    function flipCardHandler(e) {
        if (!canFlipRef.current) return;
        const card = e.currentTarget;
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

        if (!timerRunningRef.current) startTimer();

        card.classList.add('flipped');

        if (!firstCardRef.current) {
            firstCardRef.current = card;
        } else {
            secondCardRef.current = card;
            canFlipRef.current = false;
            // increment moves using functional update to avoid stale closures
            setMoves((prev) => prev + 1);
            checkMatch();
        }
    }

    function clearBoardDOM() {
        const board = boardRef.current;
        if (board) board.innerHTML = '';
    }

    function startGame() {
        clearBoardDOM();
        resetTimer();
        resetCards();
        canFlipRef.current = true;
        setMoves(0);
        setMatches(0);

        // create shuffled pairs
        const cardImages = [...images, ...images];
        cardImages.sort(() => Math.random() - 0.5);

        const board = boardRef.current;
        if (!board) return;

        cardImages.forEach((imgSrc) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML =
                '<div class="card-front"><i class="fas fa-heart"></i></div>' +
                `<div class="card-back"><img src="${imgSrc}" alt="card" /></div>`;
            card.dataset.image = imgSrc;
            card.addEventListener('click', flipCardHandler);
            board.appendChild(card);
        });
    }

    function endGame() {
        clearInterval(timerRef.current);
        if (winModalRef.current) {
            // show modal (assumes CSS handles .show)
            winModalRef.current.classList.add('show');
            const finalMoves = winModalRef.current.querySelector('#finalMoves');
            const finalTime = winModalRef.current.querySelector('#finalTime');
            if (finalMoves) finalMoves.textContent = moves;
            if (finalTime) finalTime.textContent = timeStr;
        }
    }

    function newGame() {
        if (winModalRef.current) winModalRef.current.classList.remove('show');
        clearInterval(timerRef.current);
        startGame();
    }

    return (
        <div>
            <div className='game-container'>
            <div className="container">
                <div className="header">
                    <h1>
                        <i className="fas fa-star" /> Memory Match <i className="fas fa-star" />
                    </h1>
                    <div className="stats">
                        <div className="stat">
                            <div className="stat-label">Moves</div>
                            <div className="stat-value" id="moves">
                                {moves}
                            </div>
                        </div>
                        <div className="stat">
                            <div className="stat-label">Time</div>
                            <div className="stat-value" id="time">
                                {timeStr}
                            </div>
                        </div>
                        <div className="stat">
                            <div className="stat-label">Matches</div>
                            <div className="stat-value" id="matches">
                                {matches}/{images.length}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="game-board" id="gameBoard" ref={boardRef} />

                <div className="controls">
                    <button className="btn" onClick={newGame}>
                        <i className="fas fa-redo" /> New Game
                    </button>
                </div>
            </div>

            <div className="modal" id="winModal" ref={winModalRef}>
                <div className="modal-content">
                    <h2>
                        <i className="fas fa-trophy" /> You Win! <i className="fas fa-trophy" />
                    </h2>
                    <p>
                        Moves: {moves} <br />
                        Time:  {timeStr}
                    </p>
                    <button className="btn" onClick={newGame}>
                        Play Again
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
}
