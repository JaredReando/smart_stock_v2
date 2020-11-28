import styled from 'styled-components';
import { Box } from '../../styles/layout';

export const ButtonPanelWrapper = styled.div(props => ({
    height: '100%',
    width: '150px',
    background: props.theme.colors.primary,
    display: 'grid',
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '40px 1fr 40px',
}));

export const IconButton = styled(Box)<{ active: boolean; backgroundColor?: string }>(
    {
        display: 'flex',
        alignItems: 'center',
        height: '40px',
        transition: '.2s linear all',
        cursor: 'pointer',
    },
    ({ active, backgroundColor, theme }) => {
        if (!active) {
            return {
                ':hover': {
                    background: theme.colors.warning,
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
