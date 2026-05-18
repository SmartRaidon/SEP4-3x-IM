function MeasurementContainer({ type, value, timeStamp }) {
  return (
    <div className="measurement-container">
      <div>
        <h3>{type}</h3>

        <p>Value: {value}</p>
        <p>Timestamp: {timeStamp}</p>
      </div>
    </div>
  );
}

export default MeasurementContainer;