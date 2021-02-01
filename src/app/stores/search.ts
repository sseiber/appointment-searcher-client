import { observable, runInAction } from 'mobx';
import { DataStore, StoreEvents } from '.';
import { EventEmitter2 } from 'eventemitter2';
import { getSearchEndpointsApi, postSearchAppointmentsApi } from '../../api/Search';
import { bind, sleep } from '../../utils';

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
    description: string;
    endpoint: string;
    selected: boolean;
    active: boolean;
    searching: boolean;
    appointments: number;
    searchResponseMessage: string;
    searchCount: number;
}

export class SearchStore implements DataStore {
    public static displayName = 'searchStore';

    private alertSound = new Audio('/assets/alert.mp3');

    public settings = observable({
        loading: false,
        requestInterval: 5
    });

    public searchEndpoints = observable.array([] as ISearchEndpointStatus[]);

    // public async init() {
    //     autorun(() => {
    //         for (const foo of this.searchEndpoints) {
    //             console.log(`Checkbox ${foo.id}: ${foo.active ? 'ON' : 'OFF'}`);
    //         }
    //     });
    // }

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
                            description: endpoint.description,
                            endpoint: endpoint.endpoint,
                            selected: false,
                            active: false,
                            searching: false,
                            appointments: 0,
                            searchResponseMessage: '0 scans for appointments completed',
                            searchCount: 0
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

    public startSearch(id: string): void {
        const endpoint = this.searchEndpoints.find(endpoint => endpoint.id === id)
        if (!endpoint) {
            return;
        }

        runInAction(() => {
            endpoint.active = true;
        });

        setTimeout(this.searchEndpoint, 1000, id);
    }

    @bind
    public async searchEndpoint(id: string): Promise<void> {
        const startTicks = Date.now();

        const endpoint = this.searchEndpoints.find(endpoint => endpoint.id === id)
        if (!endpoint) {
            return;
        }

        await this.searchAppointments(id);

        if (endpoint.appointments) {
            this.alertSound.play();

            this.setEndpointActiveState(id, false);
        }

        const timeout = (1000 * (this.settings.requestInterval)) - (Date.now() - startTicks)

        await sleep(2000);

        if (endpoint.active) {
            setTimeout(this.searchEndpoint, timeout > 0 ? timeout : 1000, id);
        }
    }

    public getEndpointSelectedState(id: string): boolean {
        const endpoint = this.searchEndpoints.find(endpoint => endpoint.id === id)

        return !!endpoint?.selected;
    }

    public async setEndpointSelectedState(id: string, selected: boolean): Promise<void> {
        runInAction(() => {
            const endpoint = this.searchEndpoints.find(endpoint => endpoint.id === id)
            if (endpoint) {
                endpoint.selected = selected;
            }
        });
    }

    public async setEndpointActiveState(id: string, active: boolean): Promise<void> {
        runInAction(() => {
            const endpoint = this.searchEndpoints.find(endpoint => endpoint.id === id)
            if (endpoint) {
                endpoint.active = active;
            }
        });
    }

    private async searchAppointments(id: string): Promise<boolean> {
        let succeeded = false;

        const searchEndpoint = this.searchEndpoints.find(endpoint => endpoint.id === id);
        if (!searchEndpoint) {
            return false;
        }

        runInAction(() => {
            searchEndpoint.searching = true;
        });

        try {
            const response = await postSearchAppointmentsApi({
                id
            });

            if (response.succeeded && response.body?.status) {
                runInAction(() => {
                    const searchResponse = (response.body as ISearchResponse);

                    searchEndpoint.appointments = searchResponse.available;
                    searchEndpoint.searchResponseMessage = `${++searchEndpoint.searchCount} scans for appointments completed`;
                });
            }
            else {
                // this.emitError(response);
                runInAction(() => {
                    searchEndpoint.searchResponseMessage = 'Error while requesting appointments';
                });
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
