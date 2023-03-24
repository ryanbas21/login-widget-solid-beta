type Journeys = 'Login' | 'Registration'
type JourneyMap = {
    [K in Route]: {
        [T in Journeys]: T
    }[Journeys]
}[Route]

export type Route = 'register' | '/'
type PathnameToJourney = {
    [K in Route]: Journeys
}

export function pathNameToJourney(pathname: Route): JourneyMap | null {
    console.log(pathname)
    return (
        (
            {
                ['/']: 'Login',
                register: 'Registration',
            } satisfies PathnameToJourney
        )[pathname] || null
    )
}
