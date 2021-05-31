import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './components/ForgotPassword'
import UpdateProfile from './components/UpdateProfile'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


export default function App() {
	const [animeList, SetAnimeList] = useState([]);
	const [topAnime, SetTopAnime] = useState([]);
	const [search, SetSearch] = useState("");

	const GetTopAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
			.then(res => res.json());

		SetTopAnime(temp.top.slice(0, 5));
	}

	const HandleSearch = e => {
		e.preventDefault();

		FetchAnime(search);
	}

	const FetchAnime = async (query) => {
		const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`)
			.then(res => res.json());

		SetAnimeList(temp.results);
	}

	useEffect(() => {
		GetTopAnime();
	}, []);

	return (
		<Router>
			<AuthProvider>
				<Switch>
					<PrivateRoute exact path='/' component={Dashboard} />
					<PrivateRoute path='/update-profile' component={UpdateProfile} />
					<Route path='/signup' component={SignUp} />
					<Route path='/login' component={Login} />
					<Route path='/forgot-password' component={ForgotPassword} />
					<div className="App">
						<Header />
						<div className="content-wrap">
							<Sidebar
								topAnime={topAnime} />
							<MainContent
								HandleSearch={HandleSearch}
								search={search}
								SetSearch={SetSearch}
								animeList={animeList} />
						</div>
					</div>
				</Switch>
			</AuthProvider>
		</Router>
	);
}

