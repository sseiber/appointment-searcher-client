import * as React from 'react';
import { Grid, Segment, Dimmer, Loader, Header, Message, Form, Checkbox } from 'semantic-ui-react';
import { SearchStore } from '../../stores';
import { SearchCard } from './SearchCard';
import { observer, inject } from 'mobx-react';
import { bind } from '../../../utils';

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

        const searchEndpoints = searchStore.searchEndpoints.map((endpoint) => {
            return (
                <Form.Field key={endpoint.id}>
                    <Checkbox
                        id={endpoint.id}
                        label={endpoint.name}
                        checked={this.getEndpointActiveState(endpoint.id)}
                        onChange={this.onSearchEndpointChecked}
                    />
                </Form.Field>
            );
        });

        const activeSearches = searchStore.searchEndpoints.map((endpoint) => {
            return (
                <Grid.Row key={endpoint.id}>
                    <Grid.Column>
                        <Dimmer.Dimmable>
                            <Dimmer active={endpoint.searching} inverted>
                                <Loader>Loading</Loader>
                            </Dimmer>
                            <SearchCard
                                searchEndpoint={endpoint}
                            />
                        </Dimmer.Dimmable>
                    </Grid.Column>
                </Grid.Row>
            );
        });

        for (const foo of searchStore.searchEndpoints) {
            console.log(`Checkbox ${foo.id}: ${foo.active ? 'ON' : 'OFF'}`);
        }
        return (
            <div>
                <Dimmer.Dimmable>
                    <Dimmer active={searchStore.settings.loading} inverted>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Message size={'huge'} info>
                                    <Message.Header>{`SG Client`}</Message.Header>
                                </Message>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Header attached="top" as="h3" color={'blue'}>Configured Endpoints (select to search):</Header>
                                <Segment attached="bottom">
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form>
                                                    {searchEndpoints}
                                                </Form>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        {activeSearches}
                    </Grid >
                </Dimmer.Dimmable>
            </div >
        );
    }

    // @ts-ignore
    private getEndpointActiveState(id: string): boolean {
        const {
            searchStore
        } = this.props;

        const endpoint = searchStore.searchEndpoints.find(endpoint => endpoint.id === id);
        return !!endpoint?.active;
    }

    @bind
    // @ts-ignore (e)
    private async onSearchEndpointChecked(e: any) {
        const {
            searchStore
        } = this.props;

        console.log(`Clicked id: ${e.target.id} - value is ${e.target.checked}`);

        await searchStore.setEndpointActiveState(e.target.id, e.target.checked);
        await searchStore.searchEndpoint(e.target.id);
    }
}
