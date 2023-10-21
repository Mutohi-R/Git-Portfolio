import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGithub, FaBars } from "react-icons/fa";

import '../Styles/home.css'
import Loading from "../Components/Loading";

const Home = () => {

  const [user, setUser] = useState([])
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const accessToken = import.meta.env.VITE_REACT_APP_GITHUB_ACCESS_TOKEN;
    const apiUrl = "https://api.github.com/user";
    (async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });
        setUser(response.data);
        console.log(response.data)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    })();
  }, []);

  const handleError = () => {
    navigate('/notexist')
  }

  const handleRepo = () => {
    navigate('/repolist')
  }

  return (
    isLoading ? (<Loading />) :
    (<section className="homepage">
      <aside className="home-1">
      <h1 className="username">{user.login}</h1>
      <p className="user-bio">{user.bio}</p>
      <div className="visit-links">
      <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="visit"><FaGithub style={{fontSize:'2rem', color:'#333'}}/>GitHub</a>
      <button className="visit visit-2" onClick={handleRepo}><FaBars style={{fontSize:'2rem', color:'#333'}}/> Repositories</button>
      </div>
      <button className="err404" onClick={handleError}>Test 404</button>
      </aside>
      <aside className="home-2">
        <img src={user.avatar_url} alt="" className="pfp"/>
        <p className="fullname">{user.name}</p>
        <p className="user-email">{user.email}</p>
        <p className="user-location">{user.location}</p>
        <div className="user-attr">
          <p>Repos: {user.public_repos}</p>
          <p className="user-gists">Gists: {user.public_gists}</p>
        </div>
        <div className="user-attr">
          <p>Followers: {user.followers}</p>
          <p className="user-follow">Following: {user.following}</p>
        </div>
      </aside>
    </section>)
  )
}

export default Home