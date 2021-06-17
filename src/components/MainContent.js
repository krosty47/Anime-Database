import React from 'react'
import AnimeCard from './AnimeCard';
import { Link } from 'react-router-dom';

export default function MainContent(props) {
	return (
		<main>
			<div className='mainNavBar'>
				<Link className='linkCss'to='/login'><p className='mainButtons'>Log In</p></Link>
				<Link className='linkCss'to='/signup'><p className='mainButtons'>Sign Up</p></Link>
			</div>
			<div className="main-head">
				<form
					className="search-box"
					onSubmit={props.HandleSearch}>
					<input
						type="search"
						placeholder="Search for an anime..."
						required
						value={props.search}
						onChange={e => props.SetSearch(e.target.value)} />
				</form>
			</div>
			<div className="anime-list">
				{props.animeList && props.animeList.map(anime => (
					<AnimeCard
						anime={anime}
						key={anime.mal_id} />
				))}
			</div>
		</main>
	)
}


