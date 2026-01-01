// Shared data for categories and jersey designs

export const categories = [
    {
        id: "cricket",
        name: "Cricket",
        image: "/nba-basketball-jersey-lakers-yellow-dark-dramatic.png",
        count: "120+ Designs",
        color: "from-yellow-500/20",
        description: "Premium cricket jersey designs for teams",
    },
    {
        id: "football",
        name: "Football",
        image: "/nfl-football-jersey-patriots-blue-dark-dramatic.png",
        count: "95+ Designs",
        color: "from-blue-500/20",
        description: "Top football jersey designs for clubs worldwide",
    },
    {
        id: "basketball",
        name: "Basketball",
        image: "/soccer-football-jersey-barcelona-red-blue-dark-dra.png",
        count: "150+ Designs",
        color: "from-red-500/20",
        description: "Professional basketball jersey designs",
    },
    {
        id: "volleyball",
        name: "Volleyball",
        image: "/mlb-baseball-jersey-yankees-pinstripe-dark-dramati.png",
        count: "80+ Designs",
        color: "from-slate-500/20",
        description: "Premium volleyball jersey designs",
    },
]


export const allJerseys = [
    {
        id: 1,
        name: "Lakers City Edition",
        player: "LeBron James #23",
        price: 129,
        originalPrice: 159,
        rating: 4.9,
        reviews: 234,
        image: "/lakers-purple-gold-basketball-jersey-lebron-james-.png",
        badge: "Best Seller",
        badgeColor: "bg-primary",
        category: "basketball",
    },
    {
        id: 2,
        name: "Warriors Statement",
        player: "Stephen Curry #30",
        price: 119,
        originalPrice: null,
        rating: 4.8,
        reviews: 189,
        image: "/warriors-blue-gold-basketball-jersey-stephen-curry.png",
        badge: "New",
        badgeColor: "bg-accent text-accent-foreground",
        category: "basketball",
    },
    {
        id: 3,
        name: "Celtics Classic",
        player: "Jayson Tatum #0",
        price: 109,
        originalPrice: 139,
        rating: 4.7,
        reviews: 156,
        image: "/celtics-green-white-basketball-jersey-jayson-tatum.png",
        badge: "Sale",
        badgeColor: "bg-destructive",
        category: "basketball",
    },
    {
        id: 4,
        name: "Bulls Icon Edition",
        player: "DeMar DeRozan #11",
        price: 99,
        originalPrice: null,
        rating: 4.6,
        reviews: 98,
        image: "/bulls-red-black-basketball-jersey-derozan-dark-bac.png",
        badge: null,
        badgeColor: null,
        category: "basketball",
    },
    {
        id: 5,
        name: "Nets City Edition",
        player: "Kevin Durant #7",
        price: 139,
        originalPrice: null,
        rating: 4.9,
        reviews: 276,
        image: "/nets-black-white-basketball-jersey-kevin-durant-da.png",
        badge: "Limited",
        badgeColor: "bg-secondary text-secondary-foreground",
        category: "basketball",
    },
    {
        id: 6,
        name: "Suns Valley",
        player: "Kevin Durant #35",
        price: 129,
        originalPrice: null,
        rating: 4.8,
        reviews: 167,
        image: "/suns-orange-purple-basketball-jersey-kevin-durant-.png",
        badge: null,
        badgeColor: null,
        category: "basketball",
    },
    {
        id: 7,
        name: "Patriots Game Jersey",
        player: "Mac Jones #10",
        price: 149,
        originalPrice: 179,
        rating: 4.7,
        reviews: 145,
        image: "/nfl-football-jersey-patriots-blue-dark-dramatic.png",
        badge: "Sale",
        badgeColor: "bg-destructive",
        category: "football",
    },
    {
        id: 8,
        name: "Barcelona Home",
        player: "Pedri #8",
        price: 99,
        originalPrice: null,
        rating: 4.8,
        reviews: 312,
        image: "/soccer-football-jersey-barcelona-red-blue-dark-dra.png",
        badge: "Popular",
        badgeColor: "bg-primary",
        category: "football",
    },
    {
        id: 9,
        name: "Yankees Pinstripe",
        player: "Aaron Judge #99",
        price: 119,
        originalPrice: null,
        rating: 4.9,
        reviews: 198,
        image: "/mlb-baseball-jersey-yankees-pinstripe-dark-dramati.png",
        badge: "Classic",
        badgeColor: "bg-secondary text-secondary-foreground",
        category: "cricket",
    },
]

export function getJerseysByCategory(categoryId: string) {
    return allJerseys.filter((jersey) => jersey.category === categoryId)
}

export function getCategoryById(categoryId: string) {
    return categories.find((c) => c.id === categoryId)
}

export function getJerseyById(id: string | number) {
    return allJerseys.find((jersey) => jersey.id === Number(id))
}
