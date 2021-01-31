import { observable, autorun, runInAction } from 'mobx';
import { DataStore, StoreEvents } from '.';
import { EventEmitter2 } from 'eventemitter2';
import { getSearchEndpointsApi, postSearchAppointmentsApi } from '../../api/Search';
import { bind } from '../../utils';

export interface ISearchEndpoint {
    id: string;
    name: string;
    description: string;
    endpoint: string;
}

export interface ISearchResponse {
    status: boolean;
    id: string;
    name: string;
    description: string;
    available: number;
}

export interface ISearchEndpointStatus {
    id: string;
    name: string;
    endpoint: string;
    active: boolean;
    searching: boolean;
    appointments: number;
}

export class SearchStore implements DataStore {
    public static displayName = 'searchStore';

    public settings = observable({
        loading: false,
        requestInterval: 20
    });

    public searchEndpoints = observable.array([] as ISearchEndpointStatus[]);

    public async init() {
        autorun(() => {
            for (const foo of this.searchEndpoints) {
                console.log(`Checkbox ${foo.id}: ${foo.active ? 'ON' : 'OFF'}`);
            }
        });
    }

    public get isProduction() {
        return process.env.NODE_ENV === 'production';
    }

    private _emitter = new EventEmitter2();

    public get emitter() {
        return this._emitter;
    }

    public async getSearchEndpoints() {
        let succeeded = false;

        runInAction(() => {
            this.settings.loading = true;
        });

        try {
            const response = await getSearchEndpointsApi();
            if (response.succeeded) {
                runInAction(() => {
                    const searchEndpointResults = (response.body as ISearchEndpoint[]);

                    this.searchEndpoints.replace(searchEndpointResults.map((endpoint) => {
                        return {
                            id: endpoint.id,
                            name: endpoint.name,
                            endpoint: endpoint.endpoint,
                            active: false,
                            searching: false,
                            appointments: 0
                        }
                    }));
                });
            }
            else {
                this.emitError(response);
            }

            succeeded = response.succeeded;
        }
        catch (error) {
            this.emitError(error);
        }

        runInAction(() => {
            this.settings.loading = false;
        });

        return succeeded;
    }

    @bind
    public async searchEndpoint(id: string): Promise<void> {
        const startTicks = Date.now();

        const endpoint = this.searchEndpoints.find(endpoint => endpoint.id === id)
        if (!endpoint) {
            return;
        }

        await this.searchAppointments(endpoint);

        const timeout = (1000 * (this.settings.requestInterval)) - (Date.now() - startTicks)

        if (endpoint.active) {
            setTimeout(this.searchEndpoint, timeout > 0 ? timeout : 1000, this.searchEndpoint);
        }
    }

    public getEndpointActiveState(id: string): boolean {
        const endpoint = this.searchEndpoints.find(endpoint => endpoint.id === id)

        return !!endpoint?.active;
    }

    public async setEndpointActiveState(id: string, active: boolean): Promise<void> {
        runInAction(() => {
            const endpoint = this.searchEndpoints.find(endpoint => endpoint.id === id)
            if (endpoint) {
                console.log(`Current checkbox setting - ${endpoint.id}: ${endpoint.active ? 'ON' : 'OFF'}`);
                console.log(`New checkbox setting - ${endpoint.id}: ${active ? 'ON' : 'OFF'}`);
                endpoint.active = active;
                console.log(`Post checkbox setting - ${endpoint.id}: ${endpoint.active ? 'ON' : 'OFF'}`);
            }
        });
    }

    private async searchAppointments(searchEndpoint: ISearchEndpointStatus): Promise<boolean> {
        let succeeded = false;

        runInAction(() => {
            searchEndpoint.searching = true;
        });

        try {
            const response = await postSearchAppointmentsApi(searchEndpoint);
            if (response.succeeded) {
                runInAction(() => {
                    const searchResponse = (response.body as ISearchResponse);

                    searchEndpoint.appointments = searchResponse.available;
                });
            }
            else {
                this.emitError(response);
            }

            succeeded = response.succeeded;
        }
        catch (error) {
            this.emitError(error);
        }

        runInAction(() => {
            searchEndpoint.searching = false;
        });

        return succeeded;
    }

    private emitError(error) {
        this.emitter.emit(StoreEvents.Error, JSON.stringify(error, null, 2));
    }
}
