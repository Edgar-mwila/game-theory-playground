import React from 'react';
import '../styles/PayoffMatrix.css';

const PayoffMatrix: React.FC = () => {
  return (
    <div>
      <h3>Payoff Matrix</h3>
      <table className="payoff-matrix">
        <thead>
          <tr>
            <th></th>
            <th>Player 2 Cooperate</th>
            <th>Player 2 Defect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Player 1 Cooperate</th>
            <td>(-1, -1)</td>
            <td>(-3, 0)</td>
          </tr>
          <tr>
            <th>Player 1 Defect</th>
            <td>(0, -3)</td>
            <td>(-2, -2)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PayoffMatrix;

