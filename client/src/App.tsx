import React, { PureComponent } from 'react';
import axios from 'axios';

const getData = async (url: string) => {
  try {
    const { data } = await axios.get(url);

    return data;
  }
  catch (error) {
    window.console.log(`Error with fetching: ${error}`);
  }
};

class App extends PureComponent {

  public state = {
    feedbackTypes: [],
    feedback: []
  };

  public async componentDidMount() {
    await this.getFeedbackTypes();
    await this.getFeedback();
  }

  public getFeedbackTypes = async() => {
    const feedbackTypes = await getData('/api/feedbacktype');

    if (feedbackTypes && !feedbackTypes.error) {
      this.setState({
        feedbackTypes
      })
    }
  };

  public getFeedback = async() => {
    const feedback = await getData('api/feedback');

    if (feedback && !feedback.error) {
      this.setState({
        feedback
      })
    }
  };

  public render() {
    const { feedback, feedbackTypes } = this.state;

    return (
      <div className="App">
        <div className="feedback-types">
          {
            feedbackTypes.map((feedbackType: any, index) =>
              <div key={index} className="feedback-types__item">{feedbackType.label}</div>
            )
          }
        </div>
        <div className="feedback">
          {
            feedback.map((feedback: any, index) =>
              <div key={index} className="feedback__item">
                {feedback.text}
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
