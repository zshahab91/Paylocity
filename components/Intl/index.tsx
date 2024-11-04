import React from 'react';

const PriceFormatter: React.FC<{ price: string; currency: string }> = ({ price, currency }) => {
    const locale = 'en-US';
    // Format the price using Intl.NumberFormat
    const formattedPrice = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(parseInt(price, 10));

    return <span>{formattedPrice}</span>;
};

export default PriceFormatter;