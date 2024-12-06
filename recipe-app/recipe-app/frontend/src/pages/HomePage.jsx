import React from "react";
import { Link } from "react-router-dom"; // To link to other pages
import "./HomePage.css"; // Optional for custom styling

const HomePage = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Recipe App</h1>
                <p>Your go-to place for delicious recipes!</p>
            </header>
            
            <section className="home-content">
                <h2>What We Offer</h2>
                <p>Discover a wide variety of recipes for all occasions, whether you're cooking for one or hosting a dinner party.</p>
                
                <div className="features">
                    <div className="feature-item">
                        <h3>Easy Search</h3>
                        <p>Search recipes based on ingredients, cuisine, or meal type.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Save Your Favorites</h3>
                        <p>Bookmark your favorite recipes for later access.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Nutrition Information</h3>
                        <p>Each recipe includes detailed nutritional information.</p>
                    </div>
                </div>
            </section>

            <footer className="home-footer">
                <div className="footer-links">
                    <Link to="/recipes" className="btn">View Recipes</Link>
                    <Link to="/login" className="btn">Login</Link> {/* Add login link here */}
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
