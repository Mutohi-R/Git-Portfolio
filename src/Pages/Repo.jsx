import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types'
import { FaStar, FaCodeBranch, FaAngleDoubleLeft } from "react-icons/fa";

import "../Styles/repo.css";
import Loading from "../Components/Loading";

const Repo = ({ isDarkMode }) => {
  const { repoid } = useParams();

  const [repo, setRepo] = useState({});

  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = import.meta.env.VITE_REACT_APP_GITHUB_ACCESS_TOKEN;
    const apiUrl = `https://api.github.com/repositories/${repoid}`;
    (async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });
        setRepo(response.data);
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    })();
  }, [repoid]);

  const handleClick = () => {
    navigate(-1)
  }

  return (
    isLoading ? (<Loading />) :
    (<section className="repo-details-page">
      <h2 className="name" style={isDarkMode ? {color:'#eeeaea'} : null}>{repo.name}</h2>
      <article className="repo-details" style={isDarkMode ? {border: '5px solid var(--light-purple)', backgroundColor: '#352745', boxShadow: '5px 5px 3px #60297171'} : null}>
        <p className="des" style={isDarkMode ? {color:'#eeeaea'} : null}>
          {repo.description || "No Description"}
        </p>
        <aside className="attributes">
          <div className="attribute-1" style={isDarkMode ? {backgroundColor: '#4f3969', boxShadow: '2px 2px 3px #c778c354'} : null}>
            <p style={isDarkMode ? {color:'#eeeaea'} : null}>Created: <span className="det">{repo.created_at}</span></p>
            <p style={isDarkMode ? {color:'#eeeaea'} : null}>Last Modified: <span className="det">{repo.updated_at}</span></p>
            <p style={isDarkMode ? {color:'#eeeaea'} : null}>
              Branch: <span className="det">{repo.default_branch}</span>
            </p>
            <p style={isDarkMode ? {color:'#eeeaea'} : null}>Owner: <span className="det">{repo.owner ? repo.owner.login : "Not specified"}</span></p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={isDarkMode ? 'repo-a-dark' : 'repo-a'}>Visit GitHub Repository</a>
            {repo.homepage ? <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className={isDarkMode ? 'repo-a-dark' : 'repo-a'}>Visit Site</a> :
            <a href={repo.homepage} onClick={e => e.preventDefault()} target="_blank" rel="noopener noreferrer" className="repo-a disabled">Visit Site</a>}
          </div>
          <div className="attribute-2" style={isDarkMode ? {backgroundColor: '#4f3969', boxShadow: '2px 2px 3px #c778c354'} : null}>
            {repo.topics &&
              repo.topics.map((topic, index) => (
                <p key={`${repo.id}-${index}`} className={isDarkMode ? 'topic-dark' : 'topic'}>{topic} </p>
              ))}
            <p className={isDarkMode ? 'icon-dark ic1-dark' : 'icon ic1'}>
              <FaStar className="star" /> {repo.stargazers_count || 0}
            </p>
            <p className={isDarkMode ? 'icon-dark ic2-dark' : 'icon ic2'}><FaCodeBranch className="branch" /> {repo.forks_count || 0}</p>
            <p className={isDarkMode ? 'lang-icon-dark' : 'lang-icon'} style={repo.language == 'JavaScript' ? {backgroundColor:'#ffe680'} : repo.language == 'HTML' ? {backgroundColor:'#ff9980'} : repo.language == 'CSS' ? {backgroundColor:'#c299ff'} : {color:'#fafafae5',backgroundColor:'#333'}}>{repo.language || "Null"}</p>
          </div>
        </aside>
      </article>
      <button className="back-btn" onClick={handleClick}><FaAngleDoubleLeft className="back"/></button>
    </section>)
  );
};

Repo.propTypes = {
  isDarkMode: PropTypes.bool.isRequired, // isDarkMode is a required boolean prop
};

export default Repo;
