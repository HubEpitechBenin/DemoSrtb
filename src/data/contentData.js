// Structured content data for BPLAY platform
// Organized by categories, channels, and content types

export const contentSections = [
    {
        id: 'notre-selection',
        title: 'Notre Sélection',
        sectionColor: '#008751',
        variant: 'wide',
        items: [
            {
                title: 'Football - Les Écureuils en Action',
                channel: 'Bénin TV Sport',
                category: 'Sport',
                image: '/assets/content/sport_football_match_1768941252623.png',
                badge: 'LIVE',
            },
            {
                title: 'Afrique en Fête - Concert Exceptionnel',
                channel: 'Bénin Vibes TV',
                category: 'Culture',
                image: '/assets/content/culture_african_music_1768941411484.png',
            },
            {
                title: 'BPLAY News - Journal du Soir',
                channel: 'Bénin Info',
                category: 'Actualités',
                image: '/assets/content/news_studio_broadcast_1768941325755.png',
                badge: 'NOUVEAU',
            },
            {
                title: 'Africa on a Plate',
                channel: 'Bénin TV',
                category: 'Cuisine',
                image: '/assets/content/cooking_show_african_1768941755999.png',
            },
            {
                title: 'BPLAY Débat - L\'Avenir de l\'Afrique',
                channel: 'Bénin TV',
                category: 'Politique',
                image: '/assets/content/politics_debate_show_1768942099727.png',
            },
        ],
    },
];

export default contentSections;
