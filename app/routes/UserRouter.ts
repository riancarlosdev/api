import { Router } from 'express';

import { ControllerUser } from '../controllers/ControllerUser';
import valideBodyUser from '../utils/valide_body_user';

const r = Router();

r.post('/register-user', valideBodyUser().expressBody(), valideBodyUser().valideCampos, ControllerUser.register);

export { r };
