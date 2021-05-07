import React from 'react'

export default function Sidebar({ topAnime }) {
    if (topAnime) {
        return (
            <div>
                <aside>
                    <nav>
                        <h3>Top Anime</h3>
                        {topAnime.map(anime =>
                            <a
                                href={anime.url}
                                target="_blank"
                                rel="noreferrer"
                                key={anime.mal_id}>

                                {anime.title}

                            </a>

                        )}
                    </nav>
                </aside>
            </div>
        )
    } else {
        alert("No se encontraron animes")
    }
}
