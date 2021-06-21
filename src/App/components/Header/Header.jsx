import React from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as Logo } from '../../../assets/crown.svg';
import './header.styles.scss';
import { auth } from '../../../firebase/firebase.utils';
import { connect } from 'react-redux';
import CartIcon from './components/CartIcon';
import CartDropDown from './components/CartDropdown';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../../redux/cart/cartSelectors';
import { selectCurrentUser } from '../../../redux/user/userSelectors';

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop" >
        CONTACT
      </Link>
      {console.log(currentUser)}
      {
        currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
        ): (
          <Link className="option" to="/auth">SIGN IN</Link>
        )
      }
      <CartIcon />
    </div>
    {
      !hidden && <CartDropDown />
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
