/*
 * forgerock-sample-web-react
 *
 * request.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { request } from '@forgerock/login-widget'
import { Method } from 'solid-start/api/types'

// import { API_URL, DEBUGGER } from '../constants'

const API_URL = 'http://localhost:9443'
const DEBUGGER = false

/**
 * @function request - A convenience function for wrapping around HttpClient
 * @param {string} resource - the resource path for the API server
 * @param {string} method - the method (GET, POST, etc) for the API server
 * @param {string} data - the data to POST against the API server
 * @return {Object} - JSON response from API
 */
export default async function makeRequest(
    resource: string,
    method: Method,
    data?: unknown
) {
    try {
        /** ***********************************************************************
         * SDK INTEGRATION POINT
         * Summary: HttpClient for protected resource server requests.
         * ------------------------------------------------------------------------
         * Details: This helper retrieves your access token from storage and adds
         * it to the authorization header as a bearer token for making HTTP
         * requests to protected resource APIs. It's a wrapper around the native
         * fetch method.
         *********************************************************************** */
        const response = await request({
            url: `${API_URL}/${resource}`,
            init: {
                body: data && JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
                method,
            },
            timeout: 0,
        })
        if (!response.ok) {
            throw new Error(`Status ${response.status}: API request failed`)
        }
        return response.json()
    } catch (err) {
        return {
            error: err.message,
        }
    }
}
