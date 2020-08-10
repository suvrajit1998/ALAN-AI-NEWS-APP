import React, { useEffect, useState } from 'react'

import alanBtn from '@alan-ai/alan-sdk-web'

import wordsToNumbers from 'words-to-numbers'

import NewsCards from './components/NewsCards/NewsCards.component'
import useStyles from './styles'

const alanKey = '5f3f12db3f23bf14572cab56f90805262e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {
	const classes = useStyles()
	const [newsArticles, setNewsArticles] = useState([])
	const [activeArticle, setActiveArticle] = useState(-1)

	useEffect(() => {
		alanBtn({
			key: alanKey,
			onCommand: ({ command, articles, number }) => {
				if (command === 'newHeadlines') {
					setNewsArticles(articles)
					setActiveArticle(-1)
				} else if (command === 'highlight') {
					setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
				} else if (command === 'open') {
					const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number

					const article = articles[parsedNumber - 1]

					if (parsedNumber > 20) {
						alanBtn().playText('please try that again.')
					} else if (article) {
						window.open(article.url, '_blank')
						alanBtn().playText('Opening...')
					}
				}
			},
		})
	}, [])

	return (
		<div>
			<div className={classes.logoContainer}>
				<img
					src='https://alan.app/voice/images/previews/preview.jpg'
					className={classes.alanLogo}
					alt='alan logo'
				/>
			</div>
			<NewsCards activeArticle={activeArticle} articles={newsArticles} />
		</div>
	)
}

export default App

//b3c840b4e949482abd1cdf4671d384d1
