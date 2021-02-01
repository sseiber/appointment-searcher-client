import * as React from 'react';
import { Grid, Message, Button } from 'semantic-ui-react';
import { bind } from '../../utils';

interface IHomePageProps {
    history: any;
}

export class HomePage extends React.Component<IHomePageProps, any> {
    public render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Message>
                            <h2>Appointment Searcher Client</h2>
                            <p>Welcome</p>
                        </Message>
                        <Button size={'tiny'} color={'blue'} onClick={this.onGetStarted}>Get Started</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    @bind
    // @ts-ignore (e)
    private onGetStarted(e: any) {
        const {
            history
        } = this.props;

        history.push('/search');
    }
}
