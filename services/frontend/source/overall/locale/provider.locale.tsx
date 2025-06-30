'use client';

import { FC, PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import { LocaleMessages } from './messages.locale';

export const LocaleProvider: FC<PropsWithChildren> = (props) => (
    <IntlProvider
        locale="en-US"
        messages={LocaleMessages}
    >
        {props.children}
    </IntlProvider>
);
