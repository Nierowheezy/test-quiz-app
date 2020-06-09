import React, { Component } from "react";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";
import "./App.css";

class App extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0
  };

  //Get questions
  getQuestions = () => {
    quizService().then(question => {
      console.log(question);
      this.setState({
        questionBank: question
      });
    });
  };

  componentDidMount() {
    this.getQuestions();
  }

  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0
    });
  };

  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1
      });
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    });
  };

  render() {
    return (
      <div className="container">
        <div className="title">Quizzee</div>
        {this.state.questionBank.length > 0 &&
          this.state.responses < 5 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => {
              return (
                <QuestionBox
                  question={question}
                  options={answers}
                  key={questionId}
                  selected={answer => this.computeAnswer(answer, correct)}
                />
              );
            }
          )}

        {this.state.responses === 5 ? (
          <Result score={this.state.score} playAgain={this.playAgain} />
        ) : null}
      </div>
    );
  }
}

export default App;
