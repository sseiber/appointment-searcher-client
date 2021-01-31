import * as React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { bind } from '../../utils';

interface IConfirmationDialogProps {
    onConfirmationCompletion: (complete: boolean, data: any) => (void);
}

interface IConfirmationDialogState {
    visible: boolean;
    title: string;
    message: string;
    actionLabel: string;
}

export class ConfirmationDialog extends React.Component<IConfirmationDialogProps, IConfirmationDialogState> {
    constructor(props: any, context?: any) {
        super(props, context);

        this.state = {
            visible: false,
            title: '',
            message: '',
            actionLabel: ''
        };
    }

    public doModal(title: string, message: string, actionLabel: string) {
        this.setState({
            visible: true,
            title,
            message,
            actionLabel
        });
    }

    public render() {
        const {
            title,
            message,
            actionLabel
        } = this.state;

        const {
            visible
        } = this.state;

        return (
            <Modal size="mini" open={visible} onClose={this.onCloseModal}>
                <Modal.Header>{title}</Modal.Header>
                <Modal.Content>
                    {message}
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.onCloseModal}>Cancel</Button>
                    <Button color={'red'} onClick={this.onConfirm}>{actionLabel}</Button>
                </Modal.Actions>
            </Modal>
        );
    }

    @bind
    // @ts-ignore (e)
    private onCloseModal(e: any) {
        this.setState({
            visible: false
        });
    }

    @bind
    private onConfirm(e: any) {
        const {
            onConfirmationCompletion
        } = this.props;

        this.onCloseModal(e);

        onConfirmationCompletion(true, {});
    }
}
