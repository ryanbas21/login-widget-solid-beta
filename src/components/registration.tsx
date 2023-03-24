import Widget, { component, journey } from '@forgerock/login-widget'
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

function Register() {
    const navigate = useNavigate()
    const [unsubscribe, setUnsubscribe] = createSignal(null)
    const cmp = component()
    const { pathname } = useLocation()
    const j = journey()
    const { tokens } = useContext(AuthContext)
    createEffect(() => {
        new Widget({
            target: document.getElementById('fr-modal'),
            props: {
                type: 'modal',
            },
        })
        navigate('/register', { replace: true })
        const unsub = j.subscribe((e) => {
            if (e.journey.successful) {
                navigate('/')
            }
        })
        j.start({
            journey: pathNameToJourney(pathname.replace(/\//, '') as Route),
        })
        setUnsubscribe<typeof unsub>(unsub as any)
        cmp.open()
    })
    createEffect(() => {
        if (tokens()) {
            navigate('/')
        }
    })
    onCleanup(() => {
        unsubscribe()
    })
    return (
        <div>
            <span>Register</span>
        </div>
    )
}

export default Register
