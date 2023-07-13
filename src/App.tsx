/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useContext, useEffect, useState } from "react";
import "./App.css";
import TWing from "./components/TWing";
import GameModal from "./components/GameModal";
import { useKeyUp, useKeypress } from "./hooks/keypress";
import { GameContext } from "./context/context";
import { Transition } from "@headlessui/react";
import WonModal from "./components/WonModal";
import CupOfCoffee from "./components/CupOfCoffee";
import Shield from "./components/Shield";
import Planet1 from "./assets/planets/planet1.svg";
import Planet2 from "./assets/planets/planet2.svg";
import Planet3 from "./assets/planets/planet3.svg";
import Planet4 from "./assets/planets/planet4.svg";
import Planet5 from "./assets/planets/planet5.svg";
import Planet6 from "./assets/planets/planet6.svg";
import Planet7 from "./assets/planets/planet7.svg";
import Wormhole from "./components/Wormhole";

interface QUESTIONS_INTERFACE {
  question: string;
  answers: {
    text: string;
    correct: boolean;
  }[];
}

interface MAP_INTERFACE {
  [key: string]: string;
}

const QUESTIONS: QUESTIONS_INTERFACE[] = [
  {
    question: "What year was 'Ziltoid the Omniscient' released?",
    answers: [
      { text: "1992", correct: false },
      { text: "2004", correct: false },
      { text: "2007", correct: true },
      { text: "2022", correct: false },
    ],
  },
  {
    question: "What's the name of Ziltoid's homeworld?",
    answers: [
      { text: "Ziltoidia 9", correct: true },
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: false },
      { text: "Tallatte", correct: false },
    ],
  },
  {
    question:
      "The album's release was accompanied by five webisode skits featuring a Ziltoid muppet. What social media platform were they originally broadcasted on?",
    answers: [
      { text: "Facebook", correct: false },
      { text: "Twitter", correct: false },
      { text: "YouTube", correct: false },
      { text: "MySpace", correct: true },
    ],
  },
  {
    question:
      "How were the drum tracks recorded, as the album was Townsend's solo project?",
    answers: [
      {
        text: "Programmed on EZDrummer, a software drum machine",
        correct: true,
      },
      {
        text: "By Devin Townsend, who learned how to play for this album",
        correct: false,
      },
      { text: "By a hired studio drummer", correct: false },
      { text: "There were no drum tracks", correct: false },
    ],
  },
  {
    question:
      'A sequel album to "Ziltoid the Omniscient" was released in 2014. What was its name?',
    answers: [
      { text: "Ziltoidia Ataxx!!", correct: false },
      { text: "Z^2", correct: true },
      { text: "Ziltoid 2: Not so smart now", correct: false },
      { text: "Ziltoid the Horrible", correct: false },
    ],
  },
  {
    question: "Ziltoid comes from which dimension?",
    answers: [
      { text: "The 4th Dimension", correct: true },
      { text: "The Coffee Dimension", correct: false },
      { text: "The Z Dimension", correct: false },
      { text: "The Metal Dimension", correct: false },
    ],
  },
  {
    question:
      "Ziltoid searches for the ultimate cup of coffee. When he takes a sip of Earth's ultimate coffee, he is so appalled by the taste he orders his minions to attack and destroy the planet. What word does he use to describe the taste?",
    answers: [
      { text: "Horrible", correct: false },
      { text: "Academic", correct: false },
      { text: "Fetid", correct: true },
      { text: "Blah", correct: false },
    ],
  },
  {
    question: "What weapon does Ziltoid intend to use to destroy Earth?",
    answers: [
      { text: "The death star", correct: false },
      { text: "The hammer of Thor", correct: false },
      { text: "The spinach cannon", correct: false },
      { text: "The planet smasher", correct: true },
    ],
  },
];

const PLANETS = [Planet1, Planet2, Planet3, Planet4, Planet5, Planet6, Planet7];

interface ShipState {
  canMove: boolean;
  state: "idle" | "moving" | "left" | "right";
  position: string;
  currentIndex: number;
}

const AVAILABLE_POSITIONS = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
];

const INITIAL_SHIP_STATE: ShipState = {
  canMove: true,
  state: "idle",
  position: AVAILABLE_POSITIONS[0],
  currentIndex: 0,
};

const INITIAL_TIME = 60;
const INITIAL_SHIELDS = 3;
const TIME_INCREMENET = 10;

const flag = "SWR7fW5qW19GX1pUWFFzR0ZRS0gQEU8=";

const decrypt = (key: string) => {
  return atob(xorStringWithKey(atob(flag), key));
};

const xorStringWithKey = (str: string, key: string) => {
  const result = [];
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result.push(String.fromCharCode(charCode));
  }
  return btoa(result.join(""));
};

function App() {
  const canOverlap = false;
  const [questions, setQuestions] = useState<QUESTIONS_INTERFACE[]>([]);
  const [mapGuide, setMapGuide] = useState<MAP_INTERFACE[]>([]);
  const gameContext = useContext(GameContext);

  const [ship, setShip] = useState<ShipState>(INITIAL_SHIP_STATE);
  const [timer, setTimer] = useState<number>(INITIAL_TIME);
  const [shields, setShields] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [correctAnswersIndexes, setCorrectAnswersIndexes] = useState<number[]>(
    []
  );

  const showNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const checkAnswer = (currentIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = currentQuestion.answers[currentIndex];
    const originalQuestionIndex = QUESTIONS.findIndex(
      (q) => q.question === currentQuestion.question
    );
    if (currentAnswer.correct && originalQuestionIndex !== undefined) {
      const originalAnswerIndex = QUESTIONS[
        originalQuestionIndex
      ].answers.findIndex((answer) => answer.correct);
      console.log("Correct");
      setTimer((prevTimer) => prevTimer + TIME_INCREMENET);
      setCorrectAnswersCount((prevCount) => prevCount + 1);
      correctAnswersIndexes[originalQuestionIndex] = originalAnswerIndex;
      setCorrectAnswersIndexes([...correctAnswersIndexes]);
      if (correctAnswersCount >= 2) {
        setShields((prevShields) => Math.min(prevShields + 1, INITIAL_SHIELDS));
        setCorrectAnswersCount(0);
      }
      showNextQuestion();
      if (currentQuestionIndex === questions.length - 1 && shields > 0) {
        gameContext.setGame("won");
      }
    } else {
      console.log("Incorrect");
      setShields((prevShields) => prevShields - 1);
      setCorrectAnswersCount(0);
      if (shields === 1) {
        gameContext.setGame("game-over");
      }
    }
    setTimeout(() => {
      console.log("animation ended");
      setShip((prevState: ShipState) => ({
        ...prevState,
        state: "idle",
        canMove: true,
      }));
    }, 800);
  };
  useKeypress(["ArrowRight", "KeyD", "KeyL"], () => {
    if (ship.canMove) {
      let newIndex = ship.currentIndex + 1;
      if (newIndex >= AVAILABLE_POSITIONS.length) {
        newIndex = canOverlap ? 0 : ship.currentIndex;
      }
      setShip((prevState: ShipState) => ({
        ...prevState,
        state: "right",
        position: AVAILABLE_POSITIONS[newIndex],
        currentIndex: newIndex,
      }));
    }
  });
  useKeypress(["ArrowLeft", "KeyA", "KeyJ"], () => {
    if (ship.canMove) {
      let newIndex = ship.currentIndex - 1;
      if (newIndex < 0) {
        newIndex = canOverlap
          ? AVAILABLE_POSITIONS.length - 1
          : ship.currentIndex;
      }

      setShip((prevState: ShipState) => ({
        ...prevState,
        state: "left",
        position: AVAILABLE_POSITIONS[newIndex],
        currentIndex: newIndex,
      }));
    }
  });
  useKeyUp(["Space"], () => {
    if (ship.canMove) {
      setShip((prevState: ShipState) => ({
        ...prevState,
        state: "moving",
        canMove: false,
      }));
      checkAnswer(ship.currentIndex);
    }
  });

  const initializeGame = () => {
    setShip(INITIAL_SHIP_STATE);
    setTimer(INITIAL_TIME);
    setShields(INITIAL_SHIELDS);
    setCorrectAnswersIndexes([]);
    setCorrectAnswersCount(0);
    setCurrentQuestionIndex(0);
  };

  const startGame = () => {
    initializeGame();
    gameContext.setGame("playing");
  };

  useEffect(() => {
    console.log(correctAnswersIndexes);
  }, [correctAnswersIndexes]);

  useEffect(() => {
    let intervalId: number | undefined;
    if (gameContext.state === "playing") {
      initializeGame();
      // Randomize the questions everytime we start a new game
      const randomQuestions = [...QUESTIONS];
      randomQuestions.sort(() => Math.random() - 0.5);
      setQuestions(
        randomQuestions.map((q) => {
          const randomAnswers = [...q.answers].sort(() => Math.random() - 0.5);
          const correctAnswerIndex = randomAnswers.findIndex(
            (answer) => answer.correct
          );
          const correctAnswer = randomAnswers[correctAnswerIndex];
          const randomIndex = Math.floor(Math.random() * randomAnswers.length);
          randomAnswers.splice(correctAnswerIndex, 1);
          randomAnswers.splice(randomIndex, 0, correctAnswer);
          return {
            ...q,
            answers: randomAnswers,
          };
        })
      );
      const mapGuide = randomQuestions.map((_, index) => ({
        iconName: "Planet",
        icon: PLANETS[index % PLANETS.length],
      }));
      mapGuide[mapGuide.length - 1] = { iconName: "CupOfCoffee", icon: "☕" };
      setMapGuide(mapGuide);

      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(intervalId);
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameContext.state]);

  useEffect(() => {
    if (gameContext.state === "playing" && timer === 0) {
      gameContext.setGame("game-over");
      setShip((prevState: ShipState) => ({
        ...prevState,
        state: "idle",
        canMove: false,
      }));
    }
  }, [gameContext, timer]);

  const buttonClasses =
    "inline-flex w-full justify-center rounded-md bg-thm-700 px-3 py-2 text-sm font-semibold text-green-500 shadow-sm hover:bg-thm-800 focus-visible:bg-thm-900 focus-visible:bg-thm-900 focus-visible:bg-thm-900 focus-visible:bg-thm-900 focus-visible:outline-none";

  return (
    <section className="min-h-screen bg-thm-700 text-thm-50 flex flex-col">
      <header className="bg-thm-800 w-full flex relative items-center flex-shrink-0 py-2">
        <img
          src="https://assets.tryhackme.com/img/logo/tryhackme_logo_full.svg"
          className="h-16 self-start p-2 absolute hidden sm:block"
          alt="image-logo"
        ></img>
        <div className="flex flex-col items-center justify-center w-full p-2">
          <h1 className="text-3xl font-bold">Ziltoid, the Omniscient</h1>
          <div className="text-green-500">Trivia Game</div>
        </div>
      </header>
      <div className="max-w-lg px-2 mx-auto flex-grow items-start flex">
        {gameContext.state === "playing" && (
          <div className="w-full">
            <div className="text-center leading-none text-2xl tabular-nums text-glow font-mono py-2 ">
              {timer}
            </div>
            <div className="flex">
              <div className="bg-thm-800 grid">
                {mapGuide.length > 0 &&
                  mapGuide
                    .map((mapGuide, mapGuideIndex) => (
                      <div
                        key={mapGuideIndex}
                        className="flex items-center flex-col space-y-6 w-20 py-2"
                      >
                        <div
                          className={`${
                            mapGuideIndex === currentQuestionIndex
                              ? "text-green-300"
                              : currentQuestionIndex > mapGuideIndex
                              ? "opacity-10"
                              : "text-gray-300 opacity-90"
                          }`}
                        >
                          {mapGuide.iconName === "Planet" && (
                            <img src={mapGuide.icon} className="w-6" />
                          )}
                          {mapGuide.iconName === "CupOfCoffee" && (
                            <CupOfCoffee className="w-10  stroke-thm-900  stroke-2" />
                          )}
                        </div>
                        {mapGuideIndex === currentQuestionIndex && (
                          <div>
                            <TWing className="w-8 mx-auto fill-green-300 stroke-green-900 opacity-50" />
                          </div>
                        )}
                      </div>
                    ))
                    .reverse()}
              </div>
              <div className="bg-thm-950 px-4 w-full mx-auto">
                <div
                  id="space"
                  className="h-full px-2 pb-4 grid grid-cols-4 grid-rows-3 w-full overflow-hidden relative"
                >
                  {Array.from(Array(4).keys()).map((_, index) => (
                    <div
                      key={index}
                      className={`${
                        ship.currentIndex === index
                          ? "text-green-400"
                          : "text-green-600"
                      } flex flex-col items-center justify-center cursor-pointer`}
                      onClick={() => {
                        console.log("ShipState: ", ship);
                        if (ship.canMove) {
                          setShip((prevState: ShipState) => ({
                            ...prevState,
                            state: "moving",
                            canMove: false,
                            currentIndex: index,
                            position: AVAILABLE_POSITIONS[index],
                          }));
                          checkAnswer(index);
                        }
                      }}
                    >
                      <div className="w-full text-center text-4xl font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <Wormhole className="h-12" />
                    </div>
                  ))}
                  <div
                    className={`${ship.position} row-start-[-1] flex justify-center`}
                  >
                    <TWing
                      className={`${ship.state} fill-green-400 w-20 stroke-thm-900 stroke-[3px]`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center w-full flex items-center flex-col space-y-2 bg-thm-800 border-b p-2 border-thm-700">
              <div>Shields</div>
              <div className="flex justify-center space-x-12">
                {Array.from(Array(INITIAL_SHIELDS).keys()).map((_, index) => (
                  <Shield
                    key={index}
                    className={`inline-block w-8 h-8 ${
                      index >= INITIAL_SHIELDS - shields
                        ? "text-green-500"
                        : "text-thm-700"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="bg-thm-800">
              {questions.map((question, index) => (
                <Transition
                  key={index}
                  show={index === currentQuestionIndex}
                  enter="transition-opacity duration-[3s]"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-[3s]"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  {index === currentQuestionIndex && (
                    <div className="py-6 px-4">
                      <div className="pb-4">{question.question}</div>
                      <div className="grid grid-cols-1 gap-2 sm:gap-2 sm:grid-cols-2">
                        {question.answers.map((answer, answerIndex) => (
                          <div
                            key={answerIndex}
                            className="border divide-x divide-gray-300 flex flex-col"
                            style={{ boxSizing: "border-box" }}
                          >
                            <button
                              onClick={() => {
                                checkAnswer(answerIndex);
                                setShip((prevState: ShipState) => ({
                                  ...prevState,
                                  state: "moving",
                                  canMove: false,
                                  currentIndex: answerIndex,
                                  position: AVAILABLE_POSITIONS[answerIndex],
                                }));
                              }}
                              className={`flex-grow p-3 ${buttonClasses}`}
                            >
                              <span className="mr-2 flex-shrink font-black">
                                {String.fromCharCode(65 + answerIndex)}
                              </span>
                              <span className="flex-grow font-normal">
                                {answer.text}
                              </span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Transition>
              ))}
            </div>
          </div>
        )}
        {gameContext.state === "game-over" && (
          <div className="text-center">
            <div className="font-bold text-xl pt-6">Game Over</div>
            <p className="py-4">
              You failed to get the ultimate cup of coffee to Ziltoid, the
              Omniscient.
            </p>
            <button
              autoFocus={true}
              className={`border border-white ${buttonClasses}`}
              onClick={startGame}
            >
              Play Again
            </button>
          </div>
        )}
        {gameContext.state === "won" && (
          <WonModal
            flag={decrypt(correctAnswersIndexes.join(""))}
            onClose={startGame}
          />
        )}
      </div>
      <GameModal onClose={startGame} />
    </section>
  );
}

export default App;
