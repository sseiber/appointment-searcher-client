import { ErrorStore } from './error';
import { SearchStore } from './search';
import { DataStore, StoreEvents, StoreProvider, createStoreProvider } from './storeProvider';

export {
    ErrorStore,
    SearchStore,
    DataStore,
    StoreEvents,
    StoreProvider,
    createStoreProvider
};

export default [
    ErrorStore,
    SearchStore
];
SearchStore