import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppComponent } from './app/components/App';

// This provider needs to be imported from a separate file to enable hot loading
export const appProvider = (stores) => {
    return (
        <Provider {...stores}>
            <BrowserRouter>
                <Route path="/:filter?" component={AppComponent} />
            </BrowserRouter>
        </Provider>
    );
};
