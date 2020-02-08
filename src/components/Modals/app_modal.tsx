import React from 'react';
import ReactModal from 'react-modal';
import { Transition } from 'react-transition-group';

interface Props {
    isOpen: boolean;
    closeDelayMS?: number;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    overlayStyle?: React.CSSProperties;
    contentStyle?: any;
    onClose: () => void;
}

const defaultOverlayStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const defaultContentStyle = {
    position: 'relative',
    background: 'transparent',
    border: 'none',
};

const AppModal: React.FC<Props> = ({
                                       isOpen,
                                       closeDelayMS = 0,
                                       closeOnOverlayClick,
                                       closeOnEscape = true,
                                       overlayStyle,
                                       contentStyle,
                                       onClose,
                                       children,
                                   }) => {
    const transitionStyles: any = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    };

    return (
        <Transition in={isOpen} timeout={closeDelayMS}>
            {state => {
                return (
                    <ReactModal
                        isOpen={isOpen}
                        appElement={document.body}
                        shouldCloseOnEsc={closeOnEscape}
                        shouldCloseOnOverlayClick={closeOnOverlayClick}
                        onRequestClose={onClose}
                        closeTimeoutMS={closeDelayMS}
                        style={{
                            overlay: {
                                ...defaultOverlayStyle,
                                ...(overlayStyle || {}),
                                opacity: transitionStyles[state].opacity,
                                transition: `opacity ${closeDelayMS}ms ease-in-out`,
                            },
                            content: {
                                ...defaultContentStyle,
                                ...(contentStyle || {}),
                                opacity: transitionStyles[state].opacity,
                                transition: `opacity ${closeDelayMS}ms ease-in-out`,
                            },
                        }}
                    >
                        {children}
                    </ReactModal>
                );
            }}
        </Transition>
    );
};

export default AppModal;
