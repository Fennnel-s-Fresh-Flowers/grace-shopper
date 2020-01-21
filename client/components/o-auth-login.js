import React from 'react'

const OauthLoginForm = props => {
  return (
    <form method="get" action="server/auth/google">
      <button type="submit" className="o-auth-button">
        Login with Google
      </button>
    </form>
  )
}

export default OauthLoginForm
