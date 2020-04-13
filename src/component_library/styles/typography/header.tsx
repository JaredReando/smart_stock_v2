import AppText from './app_text';
const Header = AppText.withComponent('h1');

Header.defaultProps = {
    size: 'xlarge',
    bold: true,
};

export default Header;
