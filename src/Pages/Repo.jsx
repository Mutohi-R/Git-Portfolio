import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaCodeBranch, FaAngleDoubleLeft } from "react-icons/fa";

import "../Styles/repo.css";
import Loading from "../Components/Loading";

const Repo = () => {
  const { repoid } = useParams();

  const [repo, setRepo] = useState({});

  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const accessToken =
      "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";
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
      <h2 className="name">{repo.name}</h2>
      <article className="repo-details">
        <p className="des">
          {repo.description || "No Description"}
        </p>
        <aside className="attributes">
          <div className="attribute-1">
            <p>Created: <span className="det">{repo.created_at}</span></p>
            <p>Last Modified: <span className="det">{repo.updated_at}</span></p>
            <p>
              Branch: <span className="det">{repo.default_branch}</span>
            </p>
            <p>Owner: <span className="det">{repo.owner ? repo.owner.login : "Not specified"}</span></p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-a">Visit GitHub Repository</a>
            {repo.homepage ? <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="repo-a">Visit Site</a> :
            <a href={repo.homepage} onClick={e => e.preventDefault()} target="_blank" rel="noopener noreferrer" className="repo-a disabled">Visit Site</a>}
          </div>
          <div className="attribute-2">
            {repo.topics &&
              repo.topics.map((topic, index) => (
                <p key={`${repo.id}-${index}`} className="topic">{topic} </p>
              ))}
            <p className="icon ic1">
              <FaStar className="star" /> {repo.stargazers_count || 0}
            </p>
            <p className="icon ic2"><FaCodeBranch className="branch" /> {repo.forks_count || 0}</p>
            <p className="lang-icon" style={repo.language == 'JavaScript' ? {backgroundColor:'#ffe680'} : repo.language == 'HTML' ? {backgroundColor:'#ff9980'} : repo.language == 'CSS' ? {backgroundColor:'#c299ff'} : {backgroundColor:'#333'}}>{repo.language || "Null"}</p>
          </div>
        </aside>
      </article>
      <button className="back-btn" onClick={handleClick}><FaAngleDoubleLeft className="back"/></button>
    </section>)
  );
};

export default Repo;
