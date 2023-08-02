import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "./Header";

export function AddPost({ title }) {
  const [content, setContent] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  let postId = 0;

  const handlerChange = (e) => {
    setContent(e.target.value);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      postId = Number(id);
    }
    await fetch("http://localhost:7070/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: postId, content: content }),
    })
      .then((response) => {
        if (response.status === 204) {
          navigate("/posts");
        } else {
          return response.json();
        }
      })
      .then((result) => setResponse(result))
      .catch((e) => setResponse("Что-то пошло не так"));
  };

  return (
    <Header>
      <div>{response}</div>
      <form onSubmit={handlerSubmit}>
        <textarea
          className="input-field"
          name="text"
          value={content}
          onChange={handlerChange}
        ></textarea>
        <div className="footer-post">
          <button type="submit" className="btn-send">
            Опубликовать
          </button>
        </div>
      </form>
    </Header>
  );
}