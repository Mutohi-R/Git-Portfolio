import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";
import "../Styles/errorboundarymessage.css";

const ErrorBoundaryMessage = ({ error, isDarkMode }) => {

    const navigate = useNavigate()
    
    const handleClick = () => {
        navigate('/')
        window.location.reload()
    }

    if (!error) {
        return (
          <section className="boundary">
            <div className="boundary-message">
              <p className='p-1' style={isDarkMode ? {color:'#eeeaea'} : null}>Error Boundary Alert</p>
              <p className="p-2" style={isDarkMode ? {color:'#eeeaea'} : null}>An error occurred:</p>
              <p className="p-3">Unknown error</p>
              <button onClick={handleClick}>Back To Home</button>
            </div>
          </section>
        );
      }
    
      return (
        <section className="boundary">
          <div className="boundary-message">
            <p className="p-1" style={isDarkMode ? {color:'#eeeaea'} : null}>Error Boundary Alert</p>
            <p className="p-2" style={isDarkMode ? {color:'#eeeaea'} : null}>An error occurred:</p>
            <p className="p-3">{error.toString()}</p>
            <button onClick={handleClick}>Back To Home</button>
          </div>
        </section>
      );
};

ErrorBoundaryMessage.propTypes = {
    error: PropTypes.instanceOf(Error),
  };

export default ErrorBoundaryMessage;
