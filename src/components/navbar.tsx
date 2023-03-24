import { A } from '@solidjs/router'
import { Show, useContext } from 'solid-js'
import { AuthContext } from '~/AuthContext'
import Profile from './Profile'

function Navbar() {
    const { tokens } = useContext(AuthContext)
    return (
        <nav class="navbar">
            <span>Login Widget</span>
            <Show when={!tokens()} fallback={Profile}>
                <span>
                    <A href="/login" replace>
                        Login Modal
                    </A>
                </span>
                <span>
                    <A href="/register" replace>
                        Register Modal
                    </A>
                </span>
                <span>
                    <A href="/login-inline" replace>
                        Login Inline
                    </A>
                </span>
                <span>
                    <A href="/register-inline" replace>
                        Register Inline
                    </A>
                </span>
            </Show>
        </nav>
    )
}

export default Navbar
