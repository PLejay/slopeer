import { useEffect } from 'preact/hooks'
import { route } from 'preact-router'

type router_route = {to:string,replaceCurrentRoute:boolean}
const Redirect = ({ to }:router_route) => {
  useEffect(() => {
    route(to)
  }, [])
  return null
}

export default Redirect
