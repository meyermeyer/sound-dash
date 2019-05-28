import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class UserDashboard extends Component {
    render() {
        return(
            <div>
                <button>Create New Project</button>
                <ul>
                    <li>existing projects</li>
                </ul>
            </div>
            
        )
    }
}

export default connect()(UserDashboard)