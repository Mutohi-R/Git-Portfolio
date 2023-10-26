import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types'
import { FaGithub, FaBars } from "react-icons/fa";

import '../Styles/home.css'
import Loading from "../Components/Loading";

const Home = ({isDarkMode}) => {

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
    // {isDarkMode ? 'home-1-dark' : 'home-1'}
    (<section className={isDarkMode ? 'homepage-dark' : 'homepage'}>
      <aside className={isDarkMode ? 'home-1-dark' : 'home-1'}>
      <h1 className={isDarkMode ? 'username-dark' : 'username'}>{user.login}</h1>
      <p className={isDarkMode ? 'user-bio-dark' : 'user-bio'}>{user.bio}</p>
      <div className={isDarkMode ? 'visit-links-dark' : 'visit-links'}>
      <a href={user.html_url} target="_blank" rel="noopener noreferrer" className={isDarkMode ? 'visit-dark' : 'visit'}><FaGithub style={isDarkMode ? {fontSize:'2rem', color:'#fff'} : {fontSize:'2rem', color:'#333'}}/>GitHub</a>
      <button className={isDarkMode ? 'visit-dark visit-2-dark' : 'visit visit-2'} onClick={handleRepo}><FaBars style={isDarkMode ? {fontSize:'2rem', color:'#fff'} : {fontSize:'2rem', color:'#333'}}/> Repositories</button>
      </div>
      <button className={isDarkMode ? 'err404-dark' : 'err404'} onClick={handleError}>Test 404</button>
      </aside>
      <aside className={isDarkMode ? 'home-2-dark' : 'home-2'}>
        <img src={user.avatar_url} alt="" className={isDarkMode ? 'pfp-dark' : 'pfp'}/>
        <p className={isDarkMode ? 'fullname-dark' : 'fullname'}>{user.name}</p>
        <p className={isDarkMode ? 'user-email-dark' : 'user-email'}>{user.email}</p>
        <p className={isDarkMode ? 'user-location-dark' : 'user-location'}>{user.location}</p>
        <div className={isDarkMode ? 'user-attr-dark' : 'user-attr'}>
          <p>Repos: {user.public_repos}</p>
          <p className={isDarkMode ? 'user-gists-dark' : 'user-gists'}>Gists: {user.public_gists}</p>
        </div>
        <div className={isDarkMode ? 'user-attr-dark' : 'user-attr'}>
          <p>Followers: {user.followers}</p>
          <p className={isDarkMode ? 'user-follow-dark' : 'user-follow'}>Following: {user.following}</p>
        </div>
      </aside>
    </section>)
  )
}

Home.propTypes = {
  isDarkMode: PropTypes.bool.isRequired, // isDarkMode is a required boolean prop
}; 

export default Home