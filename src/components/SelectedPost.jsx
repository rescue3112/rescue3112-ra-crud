import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddPost } from "./AddPost";
import { Header } from "./Header";

export function SelectedPost({ title }) {
  const [post, setPost] = useState({});
  const [isEdite, setIsEdite] = useState(false);
  const [response, setResponse] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:7070/posts`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const item = result.filter((item) => {
          return Number(item.id) === Number(id);
        });
        setPost(item[0]);
      })
      .catch((e) => console.log(e.message));
    // eslint-disable-next-line
  }, []);

  const handlerDelete = () => {
    fetch(`http://localhost:7070/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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

  const handlerEdit = () => {
    setIsEdite(true);
  };

  return (
    <>
      {isEdite ? (
        <AddPost />
      ) : (
        <>
          <Header>
            <div>{response}</div>
            <div className="post-content">
              <p>
                {post
                  ? Math.floor(
                      (new Date() - new Date(post.created)) /
                        (1000 * 60 * 60 * 24)
                    )
                  : ""}
              </p>
              <br />
              <p>{post ? post.content : "Не удалось загрузить данные"}</p>
            </div>
            <div className="footer-post">
              <button className="btn-edit" onClick={handlerEdit}>
                Изменить
              </button>
              <button className="btn-del" onClick={handlerDelete}>
                Удалить
              </button>
            </div>
          </Header>
        </>
      )}
    </>
  );
}