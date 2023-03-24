import Widget, { component, journey } from '@forgerock/login-widget'
import { create } from 'domain'
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

function Login() {
    const [unsubscribe, setUnsubscribe] = createSignal(null)
    const navigate = useNavigate()
    const [cmp, setCmp] = createSignal(component())
    const { pathname } = useLocation()
    const j = journey()
    const { tokens } = useContext(AuthContext)
    onMount(() => {
        new Widget({
            target: document.getElementById('fr-modal'),
            props: {
                type: 'modal',
            },
        })

        const unsub = j.subscribe((e) => {
            if (e.journey.successful) {
                navigate('/')
            }
        })

        setUnsubscribe<typeof unsub>(unsub as any)
        j.start({
            journey: pathNameToJourney(pathname.replace(/\//, '') as Route),
        })
        cmp().open()
    })
    createEffect(() => {
        if (tokens()) {
            navigate('/')
        }
    })
    onCleanup(() => {
        unsubscribe()
        cmp().close()
    })
    return (
        <nav>
            <span>Login</span>
            <hr />
            <span></span>
        </nav>
    )
}

export default Login
