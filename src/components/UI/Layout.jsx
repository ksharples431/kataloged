import PropTypes from 'prop-types';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      <div className="row">
        <div className="column">
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;