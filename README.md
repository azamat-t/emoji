# Emoji Hub - Next.js Application

A modern, responsive web application for browsing, searching, and managing emojis using the EmojiHub API.

## 🌟 Features

- **Beautiful Landing Page**: Eye-catching design with gradient backgrounds
- **Comprehensive Emoji Catalog**: Browse all 1791+ emojis from the EmojiHub API
- **Advanced Filtering**: Filter by category, group, or search by name
- **Copy Functionality**: One-click copying of emoji HTML codes
- **Favorites System**: Save your favorite emojis with localStorage persistence
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd emoji-hub
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📁 Project Structure

```
emoji/
├── app/
│   ├── page.tsx          # Landing page
│   ├── catalog/page.tsx        # Main emoji catalog with search/filter
│   └── favorites/page.tsx      # User's favorite emojis
│   └── globals.css       # Global styles and Tailwind imports
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🎯 Usage

### Landing Page

The landing page (`/`) features a clean design with a call-to-action to explore the emoji catalog.

### Emoji Catalog

The catalog page (`/catalog`) provides:

- **Search**: Find emojis by name using the search input
- **Category Filter**: Filter by categories like "smileys and people", "animals and nature", etc.
- **Group Filter**: Filter by specific groups within categories
- **Emoji Cards**: Each card displays the emoji, its name, category, and action buttons
- **Copy Function**: Click the "Copy" button to copy the emoji's HTML code to clipboard
- **Favorites**: Click the heart icon to add/remove emojis from favorites

### Favorites Page

The favorites page (`/favorites`) allows users to:

- View all saved favorite emojis
- Copy favorite emojis
- Remove individual favorites or clear all favorites

## 🔧 API Integration

This application uses the [EmojiHub API](https://github.com/cheatsnake/emojihub) with the following endpoints:

- `GET /api/all` - Retrieve all emojis
- `GET /api/categories` - Get all available categories
- `GET /api/groups` - Get all available groups
- `GET /api/search?q={query}` - Search emojis by name

## 🛠 Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **JavaScript ES6+**: Modern JavaScript features
- **LocalStorage API**: For persisting user favorites between sessions

## 📱 Browser Support

This application supports all modern browsers including:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚦 Performance Features

- Efficient API data fetching with error handling
- Client-side filtering for instant results
- Optimized re-rendering with React hooks
- Local storage for persistent data without server calls

## 🔮 Future Enhancements

Potential improvements for the application:

- User accounts with cloud-synced favorites
- Emoji combinations and collections
- Social sharing features
- Dark/light theme toggle
- Advanced search with multiple criteria
- Emoji popularity statistics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [EmojiHub](https://github.com/cheatsnake/emojihub) for providing the free emoji API
- [Tailwind CSS](https://tailwindcss.com/) for the excellent styling framework
- [Next.js](https://nextjs.org/) team for the amazing React framework

## 📞 Support

If you have any questions or issues, please open an issue on the GitHub repository.
