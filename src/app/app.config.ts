import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';
import { fr_FR, provideNzI18n } from 'ng-zorro-antd/i18n';
import {DatePipe, registerLocaleData} from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {NZ_ICONS} from "ng-zorro-antd/icon";
import * as AllIcons from "@ant-design/icons-angular/icons";
import {IconDefinition} from "@ant-design/icons-angular";
import {UserService} from "./shared/services/webService/user/user.service";
import {HttpHelper} from "./core/helpers/http.helper";
import {AuthService} from "./shared/services/authGardService/auth.service";

registerLocaleData(fr);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideNzI18n(fr_FR),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: NZ_ICONS, useValue: icons },
    UserService,
    HttpHelper,
    AuthService,
    DatePipe
  ],
};
