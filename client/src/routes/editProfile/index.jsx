/// <reference lib="dom" />
import { useMutation } from '@urql/preact'
import { useState, useEffect } from 'preact/hooks'
import { route } from 'preact-router'

import { mutations, client, queries } from '../../services/graphqlService'
import { FormCard, Upload } from '../../components'
import { useAuth } from '../../context/AuthContext'


const EditProfile = () => {
  const { user } = useAuth()
  const [userData, setUserData] = useState({
  })

  useEffect(() => {
    async ()=> {
      const currentData = await client.query(queries.userDataQuery, { _id: user }).toPromise()
      const { username } = currentData.data.user
      setUserData( username )
    }
  }, [])

  const [{ fetching: updatingProfile }, updateProfile] = useMutation(mutations.updateUser)

  const handleChange= (e) => {
    if (e.target.name === 'profile_picture') {
      if (e.target.validity.valid && e.target.files) {
        setUserData(prevData => ({
          ...prevData,
          profile_picture: e.target.files[0]
        }))
      }
    } else {
      setUserData(prevData => ({
        ...prevData,
        [e.target.name]: e.target.value
      }))
    }
  }

  const updateUser = async (e) => {
    e.preventDefault()
    const { username, profile_picture }= userData
    const res = await updateProfile({ _id: user, username, profile_picture })
    route(`/profile/${user}`, true)
  }

  return <FormCard showSpinner={updatingProfile}>
    <form onSubmit={updateUser} onChange={handleChange}>
      <h1>EDIT PROFILE</h1>
      <h2>Username</h2>
      <input type='text' name='username' value={userData.username} />
      <Upload name='profile_picture' />
      <button type='submit'>Submit</button>
    </form>
  </FormCard>
}

export default EditProfile
