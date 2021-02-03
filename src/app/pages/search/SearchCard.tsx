import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { ISearchEndpointStatus, SearchStore } from '../../stores/search';
import { Segment, Divider, Item, Card, Icon, Button, Message } from 'semantic-ui-react';
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
                    <Segment clearing color={'blue'} textAlign='left'>
                        {searchEndpoint.description}
                        <Divider clearing />
                        {
                            searchEndpoint.openSlots.length > 0
                                ? (
                                    <Item.Group divided>
                                        <Message size={'tiny'} color={'green'} info>
                                            <Message.Header>{`${searchEndpoint.openSlots.length} appointments found`}</Message.Header>
                                        </Message>
                                        { this.createOpenSlotSegments()}
                                        <Button size={'tiny'} floated="right" color={'blue'} onClick={this.onPauseButton}>{searchEndpoint.active ? 'Pause' : 'Resume'}</Button>
                                    </Item.Group>
                                )
                                : (
                                    <div>
                                        <Message size={'tiny'} color={searchEndpoint.searching ? 'yellow' : 'blue'} info>
                                            <Message.Header>{searchEndpoint.searching ? 'Retrieving appointment data...' : 'No appointments found'}</Message.Header>
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

    // @ts-ignore
    private createOpenSlotSegments() {
        const {
            searchEndpoint
        } = this.props;

        return searchEndpoint.openSlots.map((openSlot) => {
            return (
                <Item>
                    <Item.Content>
                        <Item.Header>{openSlot.date} {openSlot.time}</Item.Header>
                        <Item.Description>{`${openSlot.dose} Available`}</Item.Description>
                        <Item.Extra>
                            <Button size={'tiny'} floated="right" color={'green'} onClick={this.onGoToPageButton}>Open...</Button>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            )
        });
    }

    @bind
    // @ts-ignore
    private onGoToPageButton(e: any) {
        const {
            searchEndpoint
        } = this.props;

        window.open(searchEndpoint.endpoint, '_blank');
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
