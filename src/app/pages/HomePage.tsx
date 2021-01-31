import * as React from 'react';
import { Grid, Message } from 'semantic-ui-react';

export class HomePage extends React.Component<any, any> {
    public render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Message>
                            <h2>LoopBox</h2>
                            <p>Welcome to your LoopBox</p>
                        </Message>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
