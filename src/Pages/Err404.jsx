import { useNavigate } from "react-router-dom";

import "../Styles/err404.css"

const Err404 = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')
    }

  return (
    <section className="page-err">
      <article className="msg-err">
        <p>OOPS!</p>
        <div className="word-404">
          <span className="w1">4</span>
          <span className="w2">0</span>
          <span className="w3">4</span>
        </div>
        <p>SORRY, THE PAGE YOU REQUESTED WAS NOT FOUND</p>
        <button className="err-btn" onClick={handleClick}>Back to home</button>
      </article>
    </section>
  );
};

export default Err404;
