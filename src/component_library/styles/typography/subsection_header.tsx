import AppText from './app_text';
const SubsectionHeader = AppText.withComponent('h3');

SubsectionHeader.defaultProps = {
    size: 'medium',
    uppercase: true,
};

export default SubsectionHeader;
