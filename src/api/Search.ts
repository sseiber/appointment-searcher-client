import { FetchResponse, fetchHelper } from './fetchHelper';

export function getSearchEndpointsApi(): Promise<FetchResponse> {
    return fetchHelper(`/api/v1/search/endpoints`,
        {
            method: 'GET',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
}

export function postSearchAppointmentsApi(searchEndpoint: any): Promise<FetchResponse> {
    return fetchHelper(`/api/v1/search/appointment`,
        {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(searchEndpoint)
        });
}
