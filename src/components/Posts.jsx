import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7070/posts")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setPosts(result);
      })
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <>
      {posts?.length ? (
        posts.map((post) => {
          return (
            <Link className="post" key={post.id} to={`/posts/${post.id}`}>
              <div className="post-content">
                <p>
                  {Math.floor(
                    (new Date() - new Date(post.created)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  'дней назад'
                </p>
                <br />
                <p>{post.content}</p>
              </div>
            </Link>
          );
        })
      ) : (
        <div>Создайте первый пост</div>
      )}
    </>
  );
}