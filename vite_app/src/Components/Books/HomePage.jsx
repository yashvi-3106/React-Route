// import { useState, useEffect } from 'react';
// import './HomePage.css';

// const HomePage = () => {
//     const [language, setLanguage] = useState('en');
//     const [category, setCategory] = useState('books');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (language && category) {
//             fetchData();
//         }
//     }, [language, category, searchTerm]);

//     const fetchData = async () => {
//         setLoading(true);
//         setError(null);
//         setResults([]);

//         const url = `https://potterapi-fedeperin.vercel.app/${language}/${category}${searchTerm ? `?search=${searchTerm}` : '' }`;

//         try {
//             const response = await fetch(url);
//             const data = await response.json();

//             if (Array.isArray(data)) {
//                 setResults(data);
//             } else {
//                 setResults([data]);
//             }
//         } catch (error) {
//             setError('Error fetching data. Please try again later.',error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <h2>Harry Potter</h2>

//             {/* Form Controls (Language, Category Selectors, and Search) */}
//             <div className="form-controls">
//                 {/* Language Selector */}
//                 <div>
//                     <label htmlFor="language">Select Language:</label>
//                     <select
//                         id="language"
//                         value={language}
//                         onChange={(e) => setLanguage(e.target.value)}
//                     >
//                         <option value="en">English</option>
//                         <option value="es">Spanish</option>
//                         <option value="pt">Portuguese</option>
//                         <option value="fr">French</option>
//                         <option value="de">German</option>
//                     </select>
//                 </div>

//                 {/* Category Selector */}
//                 <div>
//                     <label htmlFor="category">Select Category:</label>
//                     <select
//                         id="category"
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                     >
//                         <option value="books">Books</option>
//                         <option value="characters">Characters</option>
//                         <option value="spells">Spells</option>
//                         <option value="houses">Houses</option>
//                     </select>
//                 </div>

//                 {/* Search Input */}
//                 <div>
//                     <input className='sear'
//                         type="text"
//                         id="search"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         placeholder="Enter search term"
//                     />
//                 </div>

//                 <button className='button1' onClick={fetchData}>Search</button>
//             </div>

//             {/* Results Section */}
//             {loading && <p className="loading">Loading...</p>}
//             {error && <p className="error">{error}</p>}
//             <div className="results">
//                 {results.length > 0 && (
//                     <ul>
//                         {results.map((item, index) => (
//                             <li key={index}>
//                                 {/* For books */}
//                                 {category === 'books' && (
//                                     <div>
//                                         <h4>{item.title}</h4>
//                                         <img src={item.cover} alt={item.title} />
//                                         <p>{item.description}</p>
//                                     </div>
//                                 )}

//                                 {/* For characters */}
//                                 {category === 'characters' && (
//                                     <div>
//                                         <h4>{item.fullName}</h4>
//                                         <img src={item.image} alt={item.fullName} />
//                                         <p>House: {item.hogwartsHouse}</p>
//                                     </div>
//                                 )}

//                                 {/* For spells */}
//                                 {category === 'spells' && (
//                                     <div>
//                                         <h4>{item.spell}</h4>
//                                         <p><strong>Use:</strong> {item.use}</p>
//                                     </div>
//                                 )}

//                                 {/* For houses */}
//                                 {category === 'houses' && (
//                                     <div>
//                                         <h4>{item.house} {item.emoji}</h4>
//                                         <p><strong>Founder:</strong> {item.founder}</p>
//                                         <p><strong>Colors:</strong> {Array.isArray(item.colors) ? item.colors.join(', ') : 'No colors available'}</p>
//                                         <p><strong>Animal:</strong> {item.animal}</p>
//                                     </div>
//                                 )}

//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default HomePage;


import { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
    const [language, setLanguage] = useState('en');
    const [category, setCategory] = useState('books');
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (language && category) {
            fetchData();
        }
    }, [language, category, searchTerm]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        setResults([]);

        const url = `https://potterapi-fedeperin.vercel.app/${language}/${category}${searchTerm ? `?search=${searchTerm}` : '' }`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (Array.isArray(data)) {
                setResults(data);
            } else {
                setResults([data]);
            }
        } catch (error) {
            setError('Error fetching data. Please try again later.',error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="page-title">Harry Potter</h2>

            {/* Form Controls (Language, Category Selectors, and Search) */}
            <div className="form-controls">
                <div className="form-control">
                    <label htmlFor="language">Select Language:</label>
                    <select
                        id="language"
                        className="select-input"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="pt">Portuguese</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                    </select>
                </div>

                <div className="form-control">
                    <label htmlFor="category">Select Category:</label>
                    <select
                        id="category"
                        className="select-input"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="books">Books</option>
                        <option value="characters">Characters</option>
                        <option value="spells">Spells</option>
                        <option value="houses">Houses</option>
                    </select>
                </div>

                <div className="form-control">
                    <input
                        className="search-input1"
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter search term"
                    />
                </div>

                <button className="search-button" onClick={fetchData}>Search</button>
            </div>

            {/* Results Section */}
            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">{error}</p>}
            <div className="results">
                {results.length > 0 && (
                    <ul className="results-list">
                        {results.map((item, index) => (
                            <li key={index} className="result-item">
                                {category === 'books' && (
                                    <div className="result-content">
                                        <h4 className="result-title">{item.title}</h4>
                                        <img className="result-image" src={item.cover} alt={item.title} />
                                        <p className="result-description">{item.description}</p>
                                    </div>
                                )}

                                {category === 'characters' && (
                                    <div className="result-content">
                                        <h4 className="result-title">{item.fullName}</h4>
                                        <img className="result-image" src={item.image} alt={item.fullName} />
                                        <p className="result-house">House: {item.hogwartsHouse}</p>
                                    </div>
                                )}

                                {category === 'spells' && (
                                    <div className="result-content">
                                        <h4 className="result-title">{item.spell}</h4>
                                        <p className="result-use"><strong>Use:</strong> {item.use}</p>
                                    </div>
                                )}

                                {category === 'houses' && (
                                    <div className="result-content">
                                        <h4 className="result-title">{item.house} {item.emoji}</h4>
                                        <p className="result-founder"><strong>Founder:</strong> {item.founder}</p>
                                        <p className="result-colors"><strong>Colors:</strong> {Array.isArray(item.colors) ? item.colors.join(', ') : 'No colors available'}</p>
                                        <p className="result-animal"><strong>Animal:</strong> {item.animal}</p>
                                    </div>
                                )}

                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default HomePage;
