import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider, useSelector } from 'react-redux';
import { createStore , applyMiddleware, compose } from 'redux';
// import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded  } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import { BrowserRouter  } from 'react-router-dom';
import reducers from './redux/reducers';
import App from './components/App';
import firebaseConfig from './config/firebaseConfig';
import firebase from 'firebase/app';

const store = createStore(
	reducers, 
	compose(
		applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
		reduxFirestore(firebaseConfig)
	)	
);

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

// const history = createBrowserHistory({ basename: `${process.env.REACT_APP_BASE_URL}`});

function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <div>Loading Screen...</div>;
    return children
}

ReactDOM.render(
		<Provider store={store}>
			<ReactReduxFirebaseProvider {...rrfProps}>
				<BrowserRouter >
					<AuthIsLoaded>
						<App />
					</AuthIsLoaded>
				</BrowserRouter>
			</ReactReduxFirebaseProvider>
		</Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
