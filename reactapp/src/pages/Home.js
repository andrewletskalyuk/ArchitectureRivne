import React from 'react';
import './HomeStyle.scss';

const Home = () => {
    return (
        <div>
            <main>
                <ol className="gradient-list">
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Aenean tincidunt elit at ipsum cursus, vitae interdum nulla suscipit.</li>
                    <li>Curabitur in orci vel risus facilisis accumsan.</li>
                    <li>Morbi eleifend tortor lacinia sapien sagittis, quis pellentesque felis egestas.</li>
                    <li>Aenean viverra dui quis leo lacinia fringilla.</li>
                    <li>Sed varius lectus ac condimentum egestas.</li>
                </ol>
            </main>
        </div>
    );
};

export default Home;