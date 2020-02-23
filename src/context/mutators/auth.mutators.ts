import { AuthContext, mutate } from '../auth.context';

export const setAuthUser = (isValid: boolean) => {
    sessionStorage.setItem('stockUser', isValid.toString());
    mutate((draft: AuthContext) => {
        draft.validUser = isValid;
    });
};
