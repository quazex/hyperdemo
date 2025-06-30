'use client';

import { JSX } from 'react';
import { useIntl } from 'react-intl';
import { Stack, Text, Title } from '@mantine/core';
import { useRequestsStore } from '@overall/requests';
import { useQuery } from '@tanstack/react-query';

export default function BrandsPage(): JSX.Element {
    const intl = useIntl();
    const http = useRequestsStore();

    const query = useQuery({
        queryKey: [
            'brands',
        ],
        queryFn: async() => {
            const response = await http.request({
                method: 'GET',
                url: '/api/v1/brands/list',
                params: {
                    page: 1,
                },
            });
            return response.data;
        },
    });

    const titleMessage = intl.formatMessage({
        id: 'brands_title',
    });

    const totalMessage = intl.formatMessage({
        id: 'brands_total',
    }, {
        count: query.data?.total ?? 0,
    });

    return (
        <Stack>
            <Title>{titleMessage}</Title>
            <Text>{totalMessage}</Text>
        </Stack>
    );
}
