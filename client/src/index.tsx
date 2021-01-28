import {h} from 'preact';
import { Provider } from '@urql/preact'
import { client } from './services/graphqlService'
import './style'
import App from './components/app'
import { AuthProvider } from './context/AuthContext'
import { NetworkProvider } from './context/NetworkContext'

export default () =>
  <Provider value={client}>
    <NetworkProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </NetworkProvider>
  </Provider>
