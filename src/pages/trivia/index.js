import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import colors from "../../assets/colors";
import ButtonSolid from "../../components/buttons/buttonSolid";
import ButtonStroke from "../../components/buttons/buttonStroke";
import { getCategoryIndex } from "../../modules/trivia/reducer";
import { htmlDecode, sendRequest } from "../../util/util";
const ppq = 10;
class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 10,
      category: this.props.categoryIndex,
      difficulty: "medium",
      type: "multiple",
      questions: [],
      activeQuestionIndex: 0,
      activeQuestion: {},
      points: 0,
      categoryText: "",
      categoryList: [],
      loader: 0,
      remainingQuestions: 0
    };
  }
  setQuestionSet(questionSet) {
    let questions = [];
    let categoryText = questionSet[0] && questionSet[0].category;
    for (let i = 0; i < questionSet.length; i++) {
      let question = questionSet[i];
      let options = question.incorrect_answers;
      options.push(question.correct_answer);
      options = _.shuffle(options);
      questions.push({
        question: question.question,
        options,
        correctAnswer: question.correct_answer
      });
    }
    this.setState(
      { questions, categoryText, remainingQuestions: questions.length },
      () => {
        this.setActiveQuestion(0);
      }
    );
  }
  setActiveQuestion(activeQuestionIndex) {
    if (this.state.questions[activeQuestionIndex]) {
      this.setState({
        activeQuestionIndex,
        activeQuestion: this.state.questions[activeQuestionIndex]
      });
    }
  }
  answered(isCorrect, answer) {
    let newQuestionSet = _.cloneDeep(this.state.questions);
    newQuestionSet[this.state.activeQuestionIndex].answered = {
      answer,
      isCorrect
    };
    this.setState({
      questions: newQuestionSet,
      remainingQuestions: this.state.remainingQuestions - 1,
      activeQuestion: newQuestionSet[this.state.activeQuestionIndex],
      points: isCorrect ? this.state.points + ppq : this.state.points - ppq
    });
    this.setActiveQuestion(this.state.activeQuestionIndex + 1);
  }

  componentDidMount() {
    const { amount, category, difficulty, type } = this.state;
    const thenFn = response => {
      this.setQuestionSet(response.results);
    };
    const errorFn = () => {};
    sendRequest({
      amount,
      category,
      difficulty,
      type,
      success: { fn: thenFn },
      error: { fn: errorFn }
    });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.questions.length > 0 ? (
          this.state.remainingQuestions > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: 400
              }}
            >
              <div style={{ display: "flex", flex: 3 }}>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <div style={{ flex: 1 }} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flex: 4,
                      paddingRight: 5
                    }}
                  >
                    <span
                      style={{
                        fontSize: 50,
                        fontWeight: "bold",
                        color: colors.colorPrimary
                      }}
                    >
                      {this.state.activeQuestionIndex + 1}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    flex: 8,
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <div style={{ flex: 1, color: colors.colorPrimary }}>
                    <h6>{this.state.categoryText}</h6>
                  </div>
                  <div style={{ flex: 3 }}>
                    <h5>
                      {this.state.activeQuestion.question &&
                        htmlDecode(this.state.activeQuestion.question)}
                    </h5>
                  </div>
                </div>
                <div
                  style={{
                    flex: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                  }}
                >
                  <span
                    style={{
                      fontSize: 50,
                      fontWeight: "bold",
                      color: colors.colorPrimary
                    }}
                  >
                    {this.state.points}
                  </span>
                  <h6>points</h6>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 3,
                  flexDirection: "column"
                }}
              >
                {this.state.activeQuestion.answered ? (
                  <span
                    style={{
                      color: this.state.activeQuestion.answered.isCorrect
                        ? "green"
                        : "red"
                    }}
                  >
                    {htmlDecode(this.state.activeQuestion.answered.answer)}{" "}
                    {this.state.activeQuestion.answered.isCorrect
                      ? `\t+${ppq}`
                      : `\t-${ppq}`}
                  </span>
                ) : (
                  _.map(this.state.activeQuestion.options, (item, index) => (
                    <div key={item} style={{ padding: 10 }}>
                      <ButtonStroke
                        onClick={() => {
                          this.answered(
                            item === this.state.activeQuestion.correctAnswer,
                            item
                          );
                        }}
                      >
                        {htmlDecode(item)}
                      </ButtonStroke>
                    </div>
                  ))
                )}
              </div>
              <div
                style={{
                  padding: 10,
                  display: "flex",
                  flex: 1
                }}
              >
                <div style={{ flex: 1, padding: 10 }}>
                  <ButtonSolid
                    color={"#333"}
                    fontColor={colors.colorPrimary}
                    onClick={() =>
                      this.setActiveQuestion(this.state.activeQuestionIndex - 1)
                    }
                  >
                    Prev
                  </ButtonSolid>
                </div>
                <div style={{ flex: 1, padding: 10 }}>
                  <ButtonSolid
                    color={"#333"}
                    fontColor={colors.colorPrimary}
                    onClick={() =>
                      this.setActiveQuestion(this.state.activeQuestionIndex + 1)
                    }
                  >
                    Next
                  </ButtonSolid>
                </div>
                <div style={{ flex: 3 }} />
                <div style={{ flex: 1, padding: 10 }}>
                  <ButtonSolid
                    onClick={() => this.setState({ remainingQuestions: 0 })}
                  >
                    End Quiz
                  </ButtonSolid>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h6>You've Scored</h6>
              <h1>{this.state.points} Points</h1>
              <ButtonSolid onClick={() => this.props.close()}>
                Do another Quiz
              </ButtonSolid>
            </div>
          )
        ) : (
          <h6>Loading Trivia...</h6>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    categoryIndex: getCategoryIndex(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trivia);
