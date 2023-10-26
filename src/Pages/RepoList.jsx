import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'

import '../Styles/repolist.css'
import Loading from "../Components/Loading";

const RepoList = ({isDarkMode}) => {
  const [repos, setRepos] = useState([]);

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const accessToken = import.meta.env.VITE_REACT_APP_GITHUB_ACCESS_TOKEN;
    const apiUrl = "https://api.github.com/user/repos";
    (async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });
        setRepos(response.data);
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    })();
  }, []);

  const handleClick = (id) => {
    navigate(id.toString())
  }

  return (
    isLoading ? (<Loading />) :
    (
    !isLoading && <section className="repo-page">
      <h1 className="repo-heading" style={isDarkMode ? {color:'#eeeaea'} : null}>Repositories</h1>
      <article className="repo-box" >
      {repos.map((repo) => (
        <aside key={repo.id} className={`drop-animation ${isDarkMode ? 'repo-dark' : 'repo'}`}>
            <p className="repo-name" style={isDarkMode ? {color:'#eeeaea'} : null}>{repo.name}</p>
            <hr style={isDarkMode ? {backgroundColor:'#fff'} : null}/>
            <p className="repo-des" style={isDarkMode ? {color:'#eeeaea'} : null}>Description: <br/> <span className="des-content" style={isDarkMode ? {color:'#eeeaea'} : null}>{repo.description ? repo.description : '*Repository has no Description'}</span></p>
            <p className="repo-lang" style={isDarkMode ? {color:'#eeeaea'} : null}>Dominant Language: <span className="lang" style={repo.language == 'JavaScript' ? {backgroundColor:'#ff9933'} : repo.language == 'HTML' ? {backgroundColor:'#ff4000'} : repo.language == 'CSS' ? {backgroundColor:'#7300e6'} : {backgroundColor:'#333'}}>{repo.language ? repo.language : 'None'} </span></p>
            <button className="repo-button" onClick={() => handleClick(repo.id)} style={isDarkMode ? {backgroundColor: 'var(--dark-blue)', color:'#eeeaea'} : null}>View</button>
        </aside>
      ))}
      </article>
    </section>)
  );
};

RepoList.propTypes = {
  isDarkMode: PropTypes.bool.isRequired, // isDarkMode is a required boolean prop
};

export default RepoList;
