'use client';

import { JSX } from 'react';
import { useIntl } from 'react-intl';
import { Anchor, Stack, Title } from '@mantine/core';
import Link from 'next/link';

export default function DashboardPage(): JSX.Element {
    const intl = useIntl();

    const brandsTitle = intl.formatMessage({
        id: 'brands_title',
    });

    return (
        <Stack>
            <Title order={1}>Dashboard</Title>
            <Anchor href="/dashboard/brands" component={Link}>
                {brandsTitle}
            </Anchor>
        </Stack>
    );
}
