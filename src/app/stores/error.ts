import { observable, runInAction } from 'mobx';
import { FetchResponse } from '../../api/fetchHelper';
import { StoreProvider, StoreEvents, DataStore } from '.';
import { bind } from '../../utils';

export class ErrorStore implements DataStore {
    public static displayName = 'errorStore';

    public settings = observable({
        internalShouldShow: false,
        title: 'Error',
        message: ''
    })

    public get shouldShow() {
        return this.settings.internalShouldShow;
    }

    public set shouldShow(value) {
        runInAction(() => {
            this.settings.internalShouldShow = value;
        });
    }

    public showFetchError(fetchResponse: FetchResponse) {
        runInAction(() => {
            this.settings.internalShouldShow = true;
            this.settings.message = `HTTP error code ${fetchResponse.statusCode}: ${fetchResponse.message}`;
        });
    }

    public showExceptionError(error: Error) {
        runInAction(() => {
            this.settings.internalShouldShow = true;
            this.settings.message = `Unexpected error: ${error.message}`;
        });
    }

    public showError(title: string, message: string) {
        runInAction(() => {
            this.settings.internalShouldShow = true;
            this.settings.title = title;
            this.settings.message = message;
        });
    }

    public initialize(storeProvider: StoreProvider) {
        storeProvider.on(StoreEvents.Error, this.onError);
    }

    @bind
    // @ts-ignore (message)
    private onError(message: string) {
        return;
    }
}
