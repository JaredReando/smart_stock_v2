import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

export interface Props extends SpaceProps {
    color?: string;
    size?: string;
    bold?: boolean;
    light?: boolean;
    uppercase?: boolean;
    capitalize?: boolean;
    noSelect?: boolean;
}

const AppText = styled.p<Props>(props => {
    return {
        fontSize: props.theme.text.size[props.size!],
        color: props.theme.text.color[props.color!],
        fontFamily: props.theme.text.bodyFontFamily,
        fontWeight: getFontWeight(props),
        textTransform: getTextTransform(props),
        marginBlockStart: '0px',
        marginBlockEnd: '0px',
        userSelect: props.noSelect ? 'none' : 'inherit',
        transition: '100ms linear all',
    };
}, space);

function getFontWeight(props: Props) {
    if (props.bold) {
        return 600;
    }
    if (props.light) {
        return 300;
    }
    return 400;
}

function getTextTransform(props: Props) {
    if (props.uppercase) {
        return 'uppercase';
    }

    if (props.capitalize) {
        return 'capitalize';
    }

    return 'none';
}

AppText.defaultProps = {
    color: 'dark',
    size: 'medium',
};

export default AppText;
