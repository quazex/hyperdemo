'use client';

import { JSX } from 'react';
import { useIntl } from 'react-intl';
import { Anchor, Stack, Title } from '@mantine/core';
import Link from 'next/link';

export default function Page(): JSX.Element {
    const intl = useIntl();

    const dashboardTitle = intl.formatMessage({
        id: 'dashboard_title',
    });

    return (
        <Stack>
            <Title order={1}>Root</Title>
            <Anchor href="/dashboard" component={Link}>
                {dashboardTitle}
            </Anchor>
        </Stack>
    );
}
