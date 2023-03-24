// @refresh reload
import { Suspense } from 'solid-js'
import {
    Body,
    ErrorBoundary,
    Head,
    Html,
    Meta,
    Route,
    Routes,
    Scripts,
    useLocation,
} from 'solid-start'
import './root.css'
import Home from './routes'
import Registration from './components/registration'
import Navbar from './components/navbar'
import { AuthProvider } from './AuthContext'
import Login from './components/Login'
import LoginInline from './components/LoginInline'
import RegisterInline from './components/RegisterInline'

import '@forgerock/login-widget/widget.css'

export default function Root() {
    const location = useLocation()
    return (
        <Html lang="en">
            <Head>
                <Meta charset="utf-8" />
                <Meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Body>
                <AuthProvider>
                    <Navbar />
                    <Suspense>
                        <ErrorBoundary>
                            <Routes>
                                <Route path="/login" component={Login} />
                                <Route
                                    path="/login-inline"
                                    component={LoginInline}
                                />
                                <Route
                                    path="/register-inline"
                                    component={RegisterInline}
                                />
                                <Route
                                    path="/register"
                                    component={Registration}
                                />
                                <Route path="/" component={Home} />
                            </Routes>
                        </ErrorBoundary>
                    </Suspense>
                </AuthProvider>
                <Scripts />
                <div id="fr-modal"></div>
            </Body>
        </Html>
    )
}
