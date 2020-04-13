import {
    space,
    layout,
    flexbox,
    typography,
    border,
    position,
    shadow,
    color,
    SpaceProps,
    LayoutProps,
    FlexboxProps,
    TypographyProps,
    BorderProps,
    PositionProps,
    ShadowProps,
    ColorProps,
} from 'styled-system';
import styled from "styled-components";

interface BoxProps
    extends SpaceProps,
        LayoutProps,
        FlexboxProps,
        TypographyProps,
        BorderProps,
        PositionProps,
        ShadowProps,
        ColorProps {}

export const Box = styled.div<BoxProps>(
    {
        minWidth: 0,
    },
    space,
    layout,
    flexbox,
    typography,
    border,
    position,
    shadow,
    color,
);
