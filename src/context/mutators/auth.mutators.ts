import { mutate } from '../auth.context';
import { AuthContext } from '../../constants/types';

export const setAuthUser = (isValid: boolean) => {
    sessionStorage.setItem('stockUser', isValid.toString());
    mutate((draft: AuthContext) => {
        draft.validUser = isValid;
    });
};
