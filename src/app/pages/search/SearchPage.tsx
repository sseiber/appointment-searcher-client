import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Grid, Dimmer, Loader, Message, Card } from 'semantic-ui-react';
import { SearchStore } from '../../stores';
import { SearchSettings } from './SearchSettings';
import { SearchCard } from './SearchCard';

interface ISearchPageProps {
    searchStore: SearchStore;
    history: any;
}

@inject('searchStore') @observer
export class SearchPage extends React.Component<ISearchPageProps, any> {
    public componentDidMount() {
        const {
            searchStore
        } = this.props;

        searchStore.getSearchEndpoints();
    }

    public render() {
        const {
            searchStore
        } = this.props;

        const activeSearches = searchStore.searchEndpoints.map((endpoint) => {
            if (endpoint.selected) {
                return (
                    <SearchCard
                        key={endpoint.id}
                        searchStore={searchStore}
                        searchEndpoint={endpoint}
                    />
                );
            }
        });

        return (
            <Dimmer.Dimmable>
                <Dimmer active={searchStore.settings.loading} inverted>
                    <Loader>Loading</Loader>
                </Dimmer>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Message size={'large'} info>
                                <Message.Header>{`Appointment Search Client`}</Message.Header>
                            </Message>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <SearchSettings
                                searchStore={searchStore}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Card.Group itemsPerRow={2}>
                                {activeSearches}
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid >
            </Dimmer.Dimmable>
        );
    }
}
