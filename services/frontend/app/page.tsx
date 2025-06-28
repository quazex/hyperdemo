import { JSX } from 'react';
import { Title } from '@mantine/core';
import getConfig from 'next/config';

export default function Page(): JSX.Element {
    const { publicRuntimeConfig: config } = getConfig();
    const pairs = Object.entries(config).map((r) => r.join('=')).join('\n');

    return (
        <div>
            <Title order={1}>Root</Title>
            {pairs}
        </div>
    );
}
