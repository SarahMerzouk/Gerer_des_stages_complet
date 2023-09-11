import { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "axios";

import './css/EmailChecker.css'
function EmailChecker() {
  const [validUrl, setValidUrl] = useState(true);
  const { id, token } = useParams();
  const URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = URL + `/api/user/${id}/verify/${token}`;
        const { data } = await axios.get(url);
        console.error(data);
        setValidUrl(true);  
      } catch (error) {
        console.error(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [id, token, URL]);

  return (
    <Fragment>
      <div className="verify-email">
        {validUrl ? (
          <div className="verify-bloc">
            <h1 className="verify-element">Email verified successfully</h1>
            <div className="verify-element">
              <Link className="nop" to="/login">
                <button className="verify-button">Login</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="verify-bloc">
            <h1 className="verify-element">404 Not Found</h1>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default EmailChecker;
