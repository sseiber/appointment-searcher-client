import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { ISearchEndpointStatus, SearchStore } from '../../stores/search';
import { Segment, Divider, Card, Icon, Button, Message } from 'semantic-ui-react';
import { bind } from '../../../utils';

interface ISearchCardProps {
    searchStore: SearchStore,
    searchEndpoint: ISearchEndpointStatus;
}

@inject('searchStore') @observer
export class SearchCard extends React.Component<ISearchCardProps, any> {
    public render() {
        const {
            searchEndpoint
        } = this.props;

        return (
            <Card>
                <Card.Content header={searchEndpoint.name} />
                <Card.Content>
                    <Segment basic textAlign='left'>
                        {searchEndpoint.description}
                        <Divider clearing />
                        {
                            searchEndpoint.appointments
                                ? (
                                    <div>
                                        <Message size={'tiny'} color={'green'} info>
                                            <Message.Header>{`${searchEndpoint.appointments} appointments found`}</Message.Header>
                                        </Message>
                                        <Button size={'tiny'} floated="right" color={'blue'} onClick={this.onPauseButton}>{searchEndpoint.active ? 'Pause' : 'Resume'}</Button>
                                        <Button size={'tiny'} floated="right" color={'green'} href={searchEndpoint.endpoint}>Go to page</Button>
                                    </div>
                                )
                                : searchEndpoint.searching
                                    ? (
                                        <div>
                                            <Message size={'tiny'} color={'yellow'} info>
                                                <Message.Header>Retrieving appointment data...</Message.Header>
                                            </Message>
                                            <Button size={'tiny'} floated="right" color={'blue'} onClick={this.onPauseButton}>{searchEndpoint.active ? 'Pause' : 'Resume'}</Button>
                                        </div>
                                    )
                                    : (
                                        <div>
                                            <Message size={'tiny'} color={'blue'} info>
                                                <Message.Header>No appointments found</Message.Header>
                                            </Message>
                                            <Button size={'tiny'} floated="right" color={'blue'} onClick={this.onPauseButton}>{searchEndpoint.active ? 'Pause' : 'Resume'}</Button>
                                        </div>
                                    )

                        }

                    </Segment>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='calendar check' />
                    {searchEndpoint.searchResponseMessage}
                </Card.Content>
            </Card>
        );
    }

    @bind
    // @ts-ignore (e)
    private onPauseButton(e: any) {
        const {
            searchStore,
            searchEndpoint
        } = this.props;

        const activeState = searchEndpoint.active;

        searchStore.setEndpointActiveState(searchEndpoint.id, !activeState);

        if (!activeState) {
            searchStore.startSearch(searchEndpoint.id);
        }
    }
}
