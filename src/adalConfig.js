import {AuthenticationContext} from 'react-adal';

export const adalConfig = {
    tenant: '33d05390-0e0b-4269-9ced-768a7458bb20',
    clientId: '1c315574-21e0-4e40-a917-7edc344e5f5a',
    endpoints: {
        'https://graph.microsoft.com': '00000003-0000-0000-c000-000000000000',
    },
    cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

