import * as React from 'react';
import { Button, Modal, ModalProps } from 'semantic-ui-react';
import { bind } from '../../utils';

interface IModalDialog extends ModalProps {
    valid: boolean;
    onOk: (e: any) => void;
    onCancel: (e: any) => void;
}

export class ModalDialog extends React.Component<IModalDialog, {}> {
    public render() {
        const {
            valid,
            onOk,
            onCancel
        } = this.props;

        const { open, size } = this.props;
        const modalProps = { open, size };
        // const modalProps = _pick(this.props, [
        //     'open',
        //     'size'
        // ]);

        return (
            <Modal {...modalProps} onClose={onCancel} onKeyPress={this.onKeyPress}>
                {this.props.children}
                <Modal.Actions>
                    <Button color={'red'} onClick={onCancel}>Cancel</Button>
                    <Button color={'green'} disabled={!valid} onClick={onOk}>Ok</Button>
                </Modal.Actions>
            </Modal>
        );
    }

    @bind
    private onKeyPress(e: any) {
        if (e.nativeEvent.key === 'Enter' && this.props.valid) {
            this.props.onOk(e);
        }
    }
}
