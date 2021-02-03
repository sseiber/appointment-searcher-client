import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { SearchStore } from '../../stores/search';
import { Segment, Header, Form, Checkbox } from 'semantic-ui-react';
import { bind } from '../../../utils';

interface ISearchSettingsProps {
    searchStore: SearchStore;
}

@inject('searchStore') @observer
export class SearchSettings extends React.Component<ISearchSettingsProps, any> {
    public render() {
        const {
            searchStore
        } = this.props;

        const searchEndpointCheckboxes = searchStore.searchEndpoints.map((endpoint) => {
            return (
                <Form.Field key={endpoint.id}>
                    <Checkbox
                        id={endpoint.id}
                        label={endpoint.name}
                        checked={searchStore.getEndpointSelectedState(endpoint.id)}
                        onChange={this.onSearchEndpointChecked}
                    />
                </Form.Field>
            );
        });

        return (
            <div>
                <Header attached="top" as="h3" color={'blue'}>Search Settings</Header>
                <Segment attached="bottom">
                    <Form>
                        <Form.Field>
                            Select clinic dates to search:
                        </Form.Field>
                        {searchEndpointCheckboxes}
                    </Form>
                </Segment>
            </div>
        );
    }

    @bind
    // @ts-ignore (e)
    private async onSearchEndpointChecked(e: any) {
        const {
            searchStore
        } = this.props;

        await searchStore.setEndpointSelectedState(e.target.id, e.target.checked);

        searchStore.startSearch(e.target.id);
    }
}
