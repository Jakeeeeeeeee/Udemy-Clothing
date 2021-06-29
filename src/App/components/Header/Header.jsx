import React from 'react';
import {ReactComponent as Logo } from '../../../assets/crown.svg';
import './header.styles.scss';
import { auth } from '../../../firebase/firebase.utils';
import { connect } from 'react-redux';
import CartIcon from './components/CartIcon';
import CartDropDown from './components/CartDropdown';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../../redux/cart/cartSelectors';
import { selectCurrentUser } from '../../../redux/user/userSelectors';
import { HeaderContainer, LogoContainer, OptionContainer, OptionLink } from './HeaderStyles';

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionContainer>
      <OptionLink to="/shop">
        SHOP
      </OptionLink>
      <OptionLink to="/shop" >
        CONTACT
      </OptionLink>
      {
        currentUser ? (
          <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
        ): (
          <OptionLink to="/auth">SIGN IN</OptionLink>
        )
      }
      <CartIcon />
    </OptionContainer>
    {
      !hidden && <CartDropDown />
    }
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
