/* document google fonts and chakra color mode config */

import Document, {Head, Html, Main, NextScript} from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
					/>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
						rel="stylesheet"
					/>

					<body>
						<Main />
						<NextScript />
					</body>
				</Head>
			</Html>
		);
	}
}
