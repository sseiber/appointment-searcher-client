import * as React from 'react';
import { Menu, Grid } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { SearchStore } from '../stores';
import { ErrorDialog } from './ErrorDialog';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/search/SearchPage';

interface IAppProps {
    searchStore: SearchStore;
    location: any;
}

@inject('searchStore') @observer
export class AppComponent extends React.Component<IAppProps, {}> {
    public render() {
        const {
            location
        } = this.props;

        return (
            <div>
                <Menu fixed="top" inverted color={'grey'} style={{ padding: '0em 5em' }} />
                <Grid style={{ padding: '5em 5em' }}>
                    <Grid.Row>
                        <Grid.Column>
                            <Switch>
                                <Route exact path="/" component={HomePage} />
                                <Route path="/search" component={SearchPage} />
                                <Redirect from={location.pathname} to="/" />
                                {this.props.children}
                            </Switch>
                            <ErrorDialog />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Menu fixed="bottom" inverted color={'grey'} style={{ padding: '1em 5em' }} />
            </div >
        );
    }
}
