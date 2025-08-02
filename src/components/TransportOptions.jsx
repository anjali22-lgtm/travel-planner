// components/TransportOptions.jsx
const TransportOptions = ({ distance, options }) => (
  <>
    <p><strong>Distance:</strong> {distance}</p>
    <h3>Transport Options:</h3>
    <ul>
      {options.map((opt, i) => (
        <li key={i}>
          <strong>{opt.mode}</strong> – Time: {opt.time}, Fare: ₹{opt.fare}
        </li>
      ))}
    </ul>
  </>
);

export default TransportOptions;
