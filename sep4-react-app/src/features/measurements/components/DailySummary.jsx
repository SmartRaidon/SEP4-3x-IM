const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const unitByType = { temperature: "°C", humidity: "%", light: "lx" };

//check if timestamp is within last 24hr
function isFromLast24Hours(timeStamp) {
  const oneDayAgo = Date.now() - ONE_DAY_MS;
  const pointTime = new Date(timeStamp).getTime();
  return pointTime >= oneDayAgo;
}

//computes min macx and avg for msrs for last 24hr
function getDailySummary(history, type) {
  let min = null;
  let max = null;
  let sum = 0;
  let count = 0;

for (const point of history) {
    if (isFromLast24Hours(point.timeStamp)) {
      const value = point[type];
      min = Math.min(min ?? value, value);
      max = Math.max(max ?? value, value);
      sum += value;
      count += 1;
    }
  }

  if (count === 0) return null;

  return {
    min,
    max,
    avg: sum / count,
  };
}

//render one row of summart for individual msrs type
function SummaryRow({ history, type }) {
  const summary = getDailySummary(history, type);
  const unit = unitByType[type];

  if (summary === null) {
    return <p>{type}: no data</p>;
  }

  const { min, max, avg } = summary;

  return (
    <div className="daily-summary-row">
      <h3>{type}</h3>
      <p>Min: {min} {unit}</p>
      <p>Avg: {avg.toFixed(1)} {unit}</p>
      <p>Max: {max} {unit}</p>
    </div>
  );
}

//receive history and types from the page, sync when buttons pressed
function DailySummary({ history, types }) {
  return (
    <div className="daily-summary">
      <h2>Last 24 hours</h2>
      {types.map((type) => (
        <SummaryRow key={type} history={history} type={type} />
      ))}
    </div>
  );
}

export default DailySummary;