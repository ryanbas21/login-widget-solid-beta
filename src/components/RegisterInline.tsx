import Widget, { journey } from '@forgerock/login-widget'
import { createEffect, createSignal, onCleanup, useContext } from 'solid-js'
import { useNavigate } from 'solid-start'
import { AuthContext } from '~/AuthContext'

function RegisterInline() {
    const [unsubscribe, setUnsubscribe] = createSignal(null)
    const navigate = useNavigate()
    const j = journey()
    const { tokens } = useContext(AuthContext)
    createEffect((widget) => {
        const newWidget = new Widget({
            target: document.getElementById('inline'),
            props: {
                type: 'inline',
            },
        })
        navigate('/register-inline', { replace: true })
        const unsub = j.subscribe((e) => {
            if (e.journey.successful) {
                navigate('/')
            }
        })
        j.start({
            journey: 'Registration',
        })
        setUnsubscribe<typeof unsub>(unsub as any)
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
            <span id="inline"></span>
        </div>
    )
}

export default RegisterInline
