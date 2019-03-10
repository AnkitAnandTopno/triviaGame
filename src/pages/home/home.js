import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Trivia } from "..";
import colors from "../../assets/colors";
import sizes from "../../assets/dimension";
import images from "../../assets/images";
import ButtonSolid from "../../components/buttons/buttonSolid";
import { setCategoryIndex } from "../../modules/trivia/reducer";
import { sendRequest } from "../../util/util";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 10,
      category: 31,
      difficulty: "medium",
      type: "multiple",
      questions: [],
      activeQuestionIndex: 0,
      activeQuestion: {},
      points: 0,
      categoryText: "",
      categoryList: [],
      loader: 0,
      isTrivia: false
    };
  }
  getCategories() {
    const { amount, difficulty, type } = this.state;
    let category = 9,
      last = 34;
    let newCatergoryList = _.cloneDeep(this.state.categoryList);
    this.setState({ isLoading: true });
    let thenFn = response => {
      let categoryText =
        (response && response.results[0] && response.results[0].category) || "";
      newCatergoryList.push({ categoryText, categoryIndex: category - 1 });
      if (category < last) {
        this.setState({ loader: (category / last) * 100 });
        sendRequest({
          amount,
          category,
          difficulty,
          type,
          success: { fn: thenFn }
        });

        category += 1;
      } else {
        this.setState({
          categoryList: _.remove(
            newCatergoryList,
            item => item.categoryText !== ""
          ),
          isLoading: false
        });
      }
    };
    thenFn();
  }
  startTrivia(categoryIndex) {
    this.props.setCategoryIndex({ categoryIndex });
    this.setState({ isTrivia: true });
  }
  setIsTrivia(isVisible) {
    this.setState({ isTrivia: isVisible });
  }
  componentDidMount() {
    this.getCategories();
  }
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${images.entertainmentMusic})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "soft-light",
          backgroundColor: "#333",
          height: sizes.deviceHeight,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <div style={{ width: "50%" }}>
          <h1 style={{ color: "white" }}>
            Trivia <h1 style={{ color: colors.colorPrimary }}>Game</h1>
          </h1>
          <div
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 20
            }}
          >
            {this.state.isLoading ? (
              <div
                style={{
                  display: "flex"
                }}
              >
                <div
                  style={{
                    backgroundColor: "red",
                    flex: this.state.loader / 10,
                    height: 5,
                    borderTopLeftRadius: 2.5
                  }}
                />
                <div
                  style={{
                    backgroundColor: "#eee",
                    flex: (100 - this.state.loader) / 10,
                    height: 5,
                    borderTopRightRadius: 2.5
                  }}
                />
              </div>
            ) : !this.state.isTrivia ? (
              <div>
                <h3>Select a Category</h3>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {_.map(this.state.categoryList, item => (
                    <div style={{ padding: 10 }}>
                      <ButtonSolid
                        color={"#333"}
                        fontColor={colors.colorPrimary}
                        onClick={() => {
                          this.startTrivia(item.categoryIndex);
                        }}
                        style={{ margin: 10 }}
                      >
                        {item.categoryText}
                      </ButtonSolid>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Trivia close={() => this.setIsTrivia(false)} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    setCategoryIndex: payload => dispatch(setCategoryIndex(payload))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
