import * as React from 'react';
import { ISearchEndpointStatus } from '../../stores/search';
import { Segment, Divider, Dimmer, Loader, Card, Icon } from 'semantic-ui-react';

interface ISearchCardProps {
    searchEndpoint: ISearchEndpointStatus;
}

export class SearchCard extends React.Component<ISearchCardProps, any> {
    public render() {
        const {
            searchEndpoint
        } = this.props;

        return (
            <Card fluid>
                <Card.Content header={searchEndpoint.name} />
                <Card.Content>
                    <Segment basic textAlign='center'>
                        {searchEndpoint.description}
                        <Divider horizontal />
                        <Dimmer active={searchEndpoint.active} inverted>
                            <Loader indeterminate>Checking appointments...</Loader>
                        </Dimmer>
                    </Segment>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='calendar check' />
                    {
                        searchEndpoint.appointments
                            ? `${searchEndpoint.appointments} available`
                            : `No appointments available`
                    }
                </Card.Content>
            </Card>
        );
    }
}
