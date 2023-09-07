import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useEffect} from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    'use strict';

    let secretNumber = Math.trunc(Math.random() * 20) + 1;
    let score = 20;
    let highScore = 0;

    const displayMessage = function (message) {
        document.querySelector('.message').textContent = message;
    }


    useEffect(() => {
        document.querySelector('.check').addEventListener('click', function () {
            const guess = Number(document.querySelector('.guess').value)
            console.log(guess, typeof guess);

            if (!guess) {
                displayMessage('No number!')
            } else if (guess === secretNumber) {
                displayMessage('Correct number')
                document.querySelector('.number').textContent = secretNumber;
                score++;
                document.querySelector('.score').textContent = score;
                document.querySelector('body').style.backgroundColor = '#60b347';

                document.querySelector('.number').style.width = '30rem';

                if (score > highScore) {
                    highScore = score;
                    document.querySelector('.highscore').textContent = highScore;
                }
            } else if (guess !== secretNumber) {
                if (score > 1) {
                    displayMessage(guess > secretNumber ? 'Too high' : 'Too low');
                    score--;
                    document.querySelector('.score').textContent = score;
                } else {
                    displayMessage('You lost the game. Try again)')
                    document.querySelector('.score').textContent = 0;
                }
            }
        });
    }, []);

    useEffect(() => {
        document.querySelector('.again').addEventListener('click', function () {
            secretNumber = Math.trunc(Math.random() * 20) + 1;
            score = 20;
            document.querySelector('body').style.backgroundColor = '#222';
            document.querySelector('.number').style.width = '15rem';
            displayMessage('Start guessing...')
            document.querySelector('.score').textContent = score;
            document.querySelector('.number').textContent = '?';
            document.querySelector('.guess').value = '';
        });
    }, []);



    return (
      <div>
        <header>
          <h1>Guess My Number!</h1>
          <p className="between">(Between 1 and 20)</p>
          <button className="btn again">Again!</button>
          <div className="number">?</div>
        </header>
        <main>
          <section className="left">
            <input type="number" className="guess" />
            <button className="btn check">Check!</button>
          </section>
          <section className="right">
            <p className="message">Start guessing...</p>
            <p className="label-score">💯 Score: <span className="score">20</span></p>
            <p className="label-highscore">
              🥇 Highscore: <span className="highscore">0</span>
            </p>
          </section>
        </main>
      </div>
  )
}
