import Widget, { component, journey } from '@forgerock/login-widget'
import { A } from '@solidjs/router'
import {
    createEffect,
    createSignal,
    onCleanup,
    onMount,
    useContext,
} from 'solid-js'
import { useLocation, useNavigate } from 'solid-start'
import { AuthContext } from '~/AuthContext'
import { Route, pathNameToJourney } from '~/utils/pathname-to-journey'

function LoginInline() {
    const navigate = useNavigate()
    const [unsubscribe, setUnsubscribe] = createSignal(null)
    const { pathname } = useLocation()
    const j = journey()
    const { tokens } = useContext(AuthContext)
    createEffect(() => {
        new Widget({
            target: document.getElementById('inline'),
            props: {
                type: 'inline',
            },
        })
        navigate('/login-inline', { replace: true })
        const unsub = j.subscribe((e) => {
            if (e.journey.successful) {
                navigate('/')
            }
        })
        j.start({
            journey: pathNameToJourney(pathname.replace(/\//, '') as Route),
        })
        setUnsubscribe<typeof unsub>(unsub as any)
    })
    createEffect(() => {
        if (tokens()) {
            navigate('/')
        }
    })
    onCleanup(() => {
        unsubscribe()()
    })
    return (
        <nav>
            <span>Login</span>
            <hr />
            <span id="inline"></span>
        </nav>
    )
}

export default LoginInline
