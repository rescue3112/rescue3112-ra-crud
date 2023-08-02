import { useNavigate } from "react-router-dom";

export function Header({ title, children }) {
  const navigate = useNavigate();
  const handlerCancel = () => {
    navigate("/posts");
  };

  return (
    <div className="post">
      <div className="head-post">
        <span>{title}</span>
        <button className="btn-cancel" onClick={handlerCancel}>
          ×
        </button>
      </div>
      <>{children}</>
    </div>
  );
}