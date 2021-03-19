const cheerio = require('cheerio');


// https://www.hitradio.hu/ajax/hirek?page=1

const getNews = (page, baseSelector, titleSelector) => {
    const root = page(baseSelector);

    const news = [];

    root.each((i, elem) => {
        const titleNode = page(titleSelector, elem);
        const imgNode = page('img', elem);

        const title = page('a', titleNode)?.html()?.trim();
        const link = 'https://www.hitradio.hu' + (page('a', titleNode)?.attr('href') ?? '');
        const img = page(imgNode)?.attr('src')?.trim();

        news.push({
            title,
            img,
            link,
        });
    });

    return news;
}

export default async function handler(req, res) {

    const newsPage = await fetch('https://www.hitradio.hu/ajax/hirek?page=1');

    const newshtml = await newsPage.text();

    const page = cheerio.load(newshtml);

    const news1 = getNews(page, 'div.hitradio-mainarticle', 'div.hitradio-articles-title');
    const news2 = getNews(page, 'div.hitradio-altarticle', 'div.hitradio-articles-title');
    const news3 = getNews(page, 'div.hitradio-subarticle', 'div.hitradio-subarticle-title');


    res.status(200).json([...news1, ...news2, ...news3]);
}
