import "./button.css";

export default function Button({ title, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {title}
    </button>
  );
}
