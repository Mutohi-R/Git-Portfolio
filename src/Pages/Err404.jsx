import { useNavigate } from "react-router-dom";

import "../Styles/err404.css"

const Err404 = ({ isDarkMode }) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')
    }

  return (
    <section className="page-err">
      <article className="msg-err">
        <p style={isDarkMode ? {color:'#eeeaea'} : null}>OOPS!</p>
        <div className="word-404" style={isDarkMode ? {color:'#eeeaea'} : null}>
          <span className="w1">4</span>
          <span className="w2" style={isDarkMode ? {textShadow: '-5px 0px #2d0e44'} : null }>0</span>
          <span className="w3" style={isDarkMode ? {textShadow: '-5px 0px #2d0e44'} : null }>4</span>
        </div>
        <p style={isDarkMode ? {color:'#eeeaea'} : null}>SORRY, THE PAGE YOU REQUESTED WAS NOT FOUND</p>
        <button className="err-btn" style={isDarkMode ? {boxShadow: '1px 2px 2px var(--light-purple)', backgroundColor: '#2d0e44', border: '1px solid var(--light-purple)', color: '#fff'} : null} onClick={handleClick}>Back to home</button>
      </article>
    </section>
  );
};

export default Err404;
