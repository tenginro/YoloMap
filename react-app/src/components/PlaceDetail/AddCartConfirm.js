import logo from "../Navigation/logo.jpeg";

export default function AddCartConfirm() {
  return (
    <div className="cartConfirmModal">
      <img className="logo" src={logo} alt="icon"></img>
      <h3>Added to the Cart!</h3>
    </div>
  );
}
