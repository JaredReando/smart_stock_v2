import styled from 'styled-components';

export const Container = styled.div(({ theme }) => ({
    background: theme.colors.darkGrey,
}));

export const ProfilePopoutContainer = styled.div<{ visible: boolean }>(
    {
        position: 'absolute',
        top: 25,
        zIndex: 1,
    },
    ({ visible }) => ({
        // FIXME: Animating this in via opacity caused issues with components underneath it.
        // We probably want to do this with react-transition-group to unmount it on exit.
        transform: visible ? 'translateX(40px)' : 'translateX(-400px)',
        transition: 'transform 0.3s',
    }),
);
