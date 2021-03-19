import Head from 'next/head'
import {Main} from "../main";
import {Container} from "react-bootstrap";

export default function Home(props) {
    return (
        <div className="max">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="max">
                <div className="container text-center d-flex align-content-center root">
                    <Container>
                        <div className="text-center">
                            <div>
                                hitradio
                            </div>
                            @hitradio
                        </div>

                        <Main links={props.links}/>
                    </Container>
                </div>

            </main>

            <footer>

            </footer>
        </div>
    )
}

export async function getServerSideProps(context) {
    const newsRequest = await fetch('https://hittree.vercel.app/api/news');
    const news = await newsRequest.json();

    return {
        props: {
            links: news
        }
    }
}
