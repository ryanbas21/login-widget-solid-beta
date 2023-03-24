import { Show, useContext } from 'solid-js'
import { AuthContext } from '../AuthContext'
import { user } from '@forgerock/login-widget'

function Profile() {
    const { setTokens, tokens, userInfo } = useContext(AuthContext)
    return (
        <Show when={tokens()}>
            <div>
                <h1>Profile</h1>
                {userInfo() && <p>Username: {userInfo().given_name}</p>}
                {userInfo() && <p>Email: {userInfo().email} </p>}
                <button
                    type="button"
                    onClick={() => {
                        setTokens(null)
                        user.logout()
                    }}
                >
                    Logout
                </button>
            </div>
        </Show>
    )
}

export default Profile
