import * as React from 'react';
import { Grid, Message } from 'semantic-ui-react';

export class HomePage extends React.Component<any, any> {
    public render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Message>
                            <h2>Appointment Searcher Client</h2>
                            <p>Welcome</p>
                        </Message>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
