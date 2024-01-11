
import { Link } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faContactCard, faListAlt } from "@fortawesome/free-regular-svg-icons";

export default function MenuUser() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/categories">
                        <FontAwesomeIcon icon={ faListAlt } /> Categories
                    </Link>

                    <Link className="nav-item nav-link" to="/contact">
                        <FontAwesomeIcon icon={ faContactCard } /> Contact
                    </Link>

                    

                
                </div>
            </div>
        </nav>
    );
}