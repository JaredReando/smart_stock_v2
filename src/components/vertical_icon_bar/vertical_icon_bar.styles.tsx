import styled from 'styled-components'

export const Container = styled.div({});

export const ButtonPanelWrapper = styled.div(props => ({
    height: '100%',
    width: '40px',
    background: props.theme.colors.black,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const IconButton = styled.div<{ active: boolean; backgroundColor?: string }>(
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40px',
        transition: '.1s linear all',
        cursor: 'pointer',
    },
    ({ active, backgroundColor, theme }) => {
        if (!active) {
            return {
                ':hover': {
                    background: theme.colors.darkGrey,
                },
            };
        }
        return {
            fontSize: theme.text.size.large,
            background: active ? theme.colors.darkGrey : backgroundColor,
            color: theme.colors.azure,
        };
    },
);
