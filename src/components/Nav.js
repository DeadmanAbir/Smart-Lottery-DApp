import { ConnectButton } from "web3uikit";
import { Typography } from "web3uikit";
import ".././CSS/Nav.css";

export default function Nav() {
  return (
    <div className="nav-container">
      <div className="waviy">
        <span style={{ "--i": 1 }}>S</span>
        <span style={{ "--i": 2 }}>M</span>
        <span style={{ "--i": 3 }}>A</span>
        <span style={{ "--i": 4 }}>R</span>
        <span style={{ "--i": 5 }}>T</span>
        <span style={{ "--i": 6 }}> &nbsp; &nbsp;</span>
        <span style={{ "--i": 7 }}>L</span>
        <span style={{ "--i": 8 }}>O</span>
        <span style={{ "--i": 9 }}>T</span>
        <span style={{ "--i": 10 }}>T</span>
        <span style={{ "--i": 11 }}>E</span>
        <span style={{ "--i": 12 }}>R</span>
        <span style={{ "--i": 13 }}>Y</span>
      </div>

      <ConnectButton className="connect-button" />
    </div>
  );
}
