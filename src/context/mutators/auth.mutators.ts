import { mutate } from '../auth.context';
import { AuthContext } from '../../constants/types';

export const setAuthUser = (isValid: boolean) => {
    console.log('auth changed: ', isValid);
    mutate((draft: AuthContext) => {
        draft.validUser = isValid;
    });
};
