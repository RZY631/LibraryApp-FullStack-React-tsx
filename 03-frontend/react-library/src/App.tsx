import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage.tsx';
import { HomePage } from './layouts/HomePage/HomePage.tsx';
import { Footer } from './layouts/NavbarAndFooter/Footer.tsx';
import { Navbar } from './layouts/NavbarAndFooter/Navbar.tsx';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage.tsx';
import { oktaConfig } from './lib/oktaConfig.ts';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget.jsx';
import { ReviewListPage } from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage.tsx';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage.tsx';
import { MessagesPage } from './layouts/MessagesPage/MessagesPage.tsx';
import { ManageLibraryPage } from './layouts/ManageLibraryPage/ManageLibraryPage.tsx';

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };


  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
          <Route path='/search'>
            <SearchBooksPage />
          </Route>
          <Route path='/reviewlist/:bookId'>
            <ReviewListPage/>
          </Route>
          <Route path='/checkout/:bookId'>
            <BookCheckoutPage/>
          </Route>
          <Route path='/login' render={
            () => <LoginWidget config={oktaConfig} /> 
            } 
          />
          <Route path='/login/callback' component={LoginCallback} />
          <SecureRoute path='/shelf'> <ShelfPage/> </SecureRoute>
          <SecureRoute path='/messages'> <MessagesPage/> </SecureRoute>
          <SecureRoute path='/admin'> <ManageLibraryPage/> </SecureRoute>
        </Switch>
      </div>
      <Footer />
      </Security>
    </div>
  );
}

