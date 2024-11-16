export const plans = [
    {
        link: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DAILY_PRICE_URL : '',
        priceId: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DAILY_PRICE_ID : '',
        price: 2,
        duration: '/daily'
    },
    {
        link: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_MONTHLY_PRICE_URL : '',
        priceId: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_MONTHLY_PRICE_ID : '',
        price: 20,
        duration: '/month'
    },
    {
        link: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_YEARLY_PRICE_URL : '',
        priceId: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_YEARLY_PRICE_ID : '',

        price: 200,
        duration: '/year'
    }
];