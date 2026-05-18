function Scenario({ scenario, onLiked, onDisliked, feedbackLoading,feedbackSentFor, }) {
  return (
    <div className="scenario">
      <div>
        <h3>Room #{scenario.roomId}</h3>
        <p>Date: {scenario.date}</p>
        <p>Prediction for {scenario.predictionHoursAhead} hours from now</p>
    </div>

      <div className="comfort-zone-value-list">
        {scenario.values.map((value) => (
          <div key={value.type} className="comfort-zone-value-card">
            <h4>{value.label}</h4>

            <p>
              Current: {value.currentValue}
              {value.unit}
            </p>

            <p>
              Predicted: {value.predictedValue}
              {value.unit}
            </p>

            <div className="comfort-zone-feedback-buttons">
              <button
                className="comfort-zone-feedback-btn"
                onClick={() => onLiked(value.type)}
                disabled={feedbackLoading || feedbackSentFor.includes(value.type)}
              >
                Like
              </button>

              <button
                className="comfort-zone-feedback-btn"
                onClick={() => onDisliked(value.type)}
                disabled={feedbackLoading || feedbackSentFor.includes(value.type)}
              >
                Dislike
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scenario;