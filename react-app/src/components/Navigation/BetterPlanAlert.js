import logo from "../Navigation/logo.jpeg";

export default function BetterPlanAlert() {
  console.log("hitting the modal");
  return (
    <div className="cartConfirmModal">
      <img className="logo" src={logo} alt="icon"></img>
      <h3>Over budget!!! Make a better plan!</h3>
    </div>
  );
}
