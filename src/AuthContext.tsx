import { user, configuration } from '@forgerock/login-widget'
import {
  Accessor,
  Setter,
  createContext,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js'

type Auth<T> = {
  tokens: Accessor<T>
  setTokens: Setter<T>
  userInfo: Accessor<any>
  setUserInfo: Setter<any>
}
const [tokens, setTokens] = createSignal(null)
const [userInfo, setUserInfo] = createSignal(null)
export const AuthContext = createContext<Auth<boolean>>({
  userInfo,
  setUserInfo,
  tokens,
  setTokens,
})

export function AuthProvider(props) {
  configuration().set({
    forgerock: {
      serverConfig: {
        baseUrl: 'https://openam-crbrl-01.forgeblocks.com/am',
        timeout: 3000,
      },
      realmPath: 'alpha',
      clientId: 'WebOAuthClient',
      redirectUri: `${window.location.origin}/callback`,
      scope: 'openid profile email',
    },
  })
  let unsubTokens
  let unSubInfo
  let unSubJourney
  onMount(() => {
    unsubTokens = user.tokens().subscribe((tokens) => {
      setTokens(tokens.completed)
    })
    unSubInfo = user.info().subscribe((info) => {
      console.log('user info', info)
      setUserInfo(info.response)
    })
  })
  onCleanup(() => {
    unsubTokens()
    unSubInfo()
    unSubJourney()
  })
  return (
    <AuthContext.Provider
      value={{
        tokens,
        userInfo,
        setUserInfo,
        setTokens,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
