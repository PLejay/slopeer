import {h, VNode} from 'preact';
import { useContext, useState } from 'preact/hooks'
import { createContext } from 'preact'

type NetContextProps={
online:boolean;
}
const NetworkContext = createContext<Partial<NetContextProps>>({})

function NetworkProvider (props:any):VNode {
  const [online, setOnline] = useState(true)
  if (typeof window !== 'undefined') {
    setOnline(navigator.onLine)
    window.addEventListener('online', () => setOnline(true))
    window.addEventListener('offline', () => setOnline(false))
  }

  return <NetworkContext.Provider value={{ online }} {...props} />
}

const useNetwork = () => useContext(NetworkContext)

export { NetworkProvider, useNetwork }
