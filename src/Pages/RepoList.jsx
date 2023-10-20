import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

import '../Styles/repolist.css'
import Loading from "../Components/Loading";

const RepoList = () => {
  const [repos, setRepos] = useState([]);

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const accessToken =
      "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";
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
      <h1 className="repo-heading">Repositories</h1>
      <article className="repo-box">
      {repos.map((repo) => (
        <aside key={repo.id} className="repo drop-animation">
            <p className="repo-name">{repo.name}</p>
            <hr />
            <p className="repo-des">Description: <br/> <span className="des-content">{repo.description ? repo.description : '*Repository has no Description'}</span></p>
            <p className="repo-lang">Dominant Language: <span className="lang" style={repo.language == 'JavaScript' ? {backgroundColor:'#ff9933'} : repo.language == 'HTML' ? {backgroundColor:'#ff4000'} : repo.language == 'CSS' ? {backgroundColor:'#7300e6'} : {backgroundColor:'#333'}}>{repo.language ? repo.language : 'None'}</span></p>
            <button className="repo-button" onClick={() => handleClick(repo.id)}>View</button>
        </aside>
      ))}
      </article>
    </section>)
  );
};

export default RepoList;
